import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../srever/auth.service';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  avatar: File | null = null;
  avatarPreview: string | ArrayBuffer | null = null;
  user: any;
  loading = true;
  error: string | null = null;

  // للتحكم في وضع التعديل
  editingField: string | null = null;
  editedValue: string = '';
  iconEdit: boolean = false; // للتحكم في زرار الصورة

  ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: (data) => {
        if (!data) {
          this.router.navigate(['/']);
        }
        this.user = data;
        this.avatarPreview = data.avatar;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load profile';
        this.loading = false;
      }
    });
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
          this.user.avatar = res.avatar || this.avatarPreview;
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
