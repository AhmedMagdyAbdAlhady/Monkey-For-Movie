import { Component } from '@angular/core';
import { DashbordServiceService } from '../../../services/dashbord/dashbord-service.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../website/srever/auth.service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  isSupport = true
  items: any;
  totalPages: number = 0;
  currentQuery: string | undefined;
  avatar: File | null = null;
  avatarPreview: any   = null;
  user: any;
  loading = true;
  error: string | null = null;

  // للتحكم في وضع التعديل
  editingField: string | null = null;
  editedValue: string = '';
  iconEdit: boolean = false; // للتحكم في زرار الصورة
  constructor(public service: DashbordServiceService, private router: Router, private authService: AuthService, private toastr: ToastrService) { }

  ngOnInit() {
     if (!this.authService.user.isAdmin) {
      this.router.navigateByUrl('/')
    }
    this.loadPageUser(1); // تحميل أول صفحة بدون فلتر

    this.service.searchQuery$.subscribe(query => {
      this.currentQuery = query ?? undefined;
      this.loadPageUser(1, this.currentQuery);
    })
  }

  loadPageUser(page: number, searchQuery?: string) {
    this.service.getItemsOfUsers(page, searchQuery).subscribe(
      (data) => {
        data.users.map((user: any) => {
        })
        this.items = data.users;
        this.totalPages = data.NumberOFPage;
      },
      (err) => {
        console.log('Error fetching data', err);
      }
    );
  }
  editItem(item: any): void {
    this.service.getUserById(item).subscribe({
      next: (data) => {
        this.user = data;
          this.avatarPreview = data.avatar;
      },
      error: (err) => {
        console.log(this.error)
          this.toastr.warning("server Error")
      }
    });
  }

  deleteItem(id: string): void {
    if (confirm('هل أنت متأكد من حذف هذا العنصر؟')) {
      this.service.deleteUser(id).subscribe(
        (res) => {
          alert(res)
          this.loadPageUser(1, this.currentQuery)
        },
        (err) => {
          console.error('Error deleting item', err);
        }
      );
    }
  }
  changeSupport(id: any) {
    this.isSupport = !this.isSupport
    this.service.updateUser(id, { "isSupport": `${this.isSupport}` }).subscribe(
      (res) => {
        this.service.general$.subscribe(value => { this.loadPageUser(value) })
      },
      (err) => {
        this.toastr.warning(err || 'Update Failed!');
      }
    );
  }







  // صورة جديدة
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.avatar = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarPreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  triggerFileInput(fileInput: HTMLInputElement) {
    this.iconEdit = true;
    fileInput.click();
  }

  cancelImageEditing() {
    this.iconEdit = false;
    this.avatar = null;
    this.avatarPreview = this.user.avatar; // رجّع الصورة القديمة
  }

  saveImage() {
    console.log("save")
    if (this.avatar) {
      const formData = new FormData();
      formData.append("avatar", this.avatar);

      this.authService.editUser(formData, this.user._id).subscribe(
        (res) => {
          // this.user.avatar = res.avatar || this.avatarPreview;
           this.service.general$.subscribe(value => { this.loadPageUser(value) })
          this.toastr.success('Avatar updated!');
          this.iconEdit = false;
        },
        (err) => this.toastr.warning(err.error.message || 'Avatar update failed!')
      );
    }
  }

  // بدء التعديل
  startEditing(field: string, currentValue: string) {
    this.editingField = field;
    this.editedValue = currentValue;
  }

  cancelEditing() {
    this.editingField = null;
    this.editedValue = '';
  }

  // حفظ تعديل فيلد واحد
  saveField() {
    if (this.editingField) {
      const formData = new FormData();
      formData.append(this.editingField, this.editedValue);

      this.authService.editUser(formData, this.user._id).subscribe(
        (res) => {
          this.user = res.userDetails
           this.service.general$.subscribe(value => { this.loadPageUser(value) })

          this.user[this.editingField!] = this.editedValue; // حدّث القيمة محليًا
          this.toastr.success(res.message);
        },
        (err) => {
          this.toastr.warning(err || 'Update Failed!');
        }
      );

      this.editingField = null;
    }
  }
}

