const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 3000;
const SECRET_KEY = process.env.API_KEY || 'default_secret';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:4200';

app.use(cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());
app.use(cookieParser());

const USERS_FILE = path.join(__dirname, 'users.json');

// قراءة المستخدمين
const getUsers = () => {
    try {
        if (!fs.existsSync(USERS_FILE)) return [];
        const data = fs.readFileSync(USERS_FILE, 'utf-8');
        return JSON.parse(data || '[]');
    } catch (error) {
        console.error('خطأ في قراءة users.json:', error);
        return [];
    }
};

// حفظ المستخدمين
const saveUsers = (users) => {
    try {
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    } catch (error) {
        console.error('خطأ في حفظ users.json:', error);
    }
};

// التسجيل
app.post('/api/signup', async (req, res) => {
    try {
        const { firstName, lastName, username, email, password } = req.body;
        const users = getUsers();

        if (users.some(u => u.email === email)) {
            return res.status(400).json({ message: 'البريد الإلكتروني موجود مسبقًا' });
        }

        if (users.some(u => u.username === username)) {
            return res.status(400).json({ message: 'اسم المستخدم موجود مسبقًا' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            id: Date.now().toString(),
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword
        };

        users.push(newUser);
        saveUsers(users);

        res.status(201).json({ message: 'تم التسجيل بنجاح',user: {
            id: newUser.id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            username: newUser.username,
            email: newUser.email
        } });
    } catch (error) {
        res.status(500).json({ message: 'خطأ في الخادم', error: error.message });
    }
});

// تسجيل الدخول
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const users = getUsers();
        const user = users.find(u => u.email === email);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'بريد إلكتروني أو كلمة مرور غير صحيحة' });
        }

        const token = jwt.sign({ userId: user.id, email }, SECRET_KEY, { expiresIn: '1h' });

        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000
        });

        res.status(200).json({
            message: 'تم تسجيل الدخول بنجاح',
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'خطأ في الخادم' });
    }
});

// جلب بيانات المستخدم
app.get('/api/user', (req, res) => {
    try {
        const token = req.cookies.auth_token;
        if (!token) return res.status(401).json({ message: 'غير مصرح به' });

        const decoded = jwt.verify(token, SECRET_KEY);
        const user = getUsers().find(u => u.id === decoded.userId);

        if (!user) return res.status(404).json({ message: 'المستخدم غير موجود' });

        res.json({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email
        });
    } catch (error) {
        res.status(401).json({ message: 'توكن غير صالح' });
    }
});

// تسجيل الخروج
app.post('/api/logout', (req, res) => {
    res.clearCookie('auth_token');
    res.status(200).json({ message: 'تم تسجيل الخروج بنجاح' });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
