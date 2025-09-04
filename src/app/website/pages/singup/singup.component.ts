import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../srever/auth.service';
import { CanComponentDeactivate } from '../../guards/can-component-deactivate';

import { ToastrService } from 'ngx-toastr';

import { Router } from '@angular/router';

@Component({
  selector: 'app-singup',
  standalone: false,
  templateUrl: './singup.component.html',
  styleUrl: './singup.component.css'
})

export class SingupComponent implements CanComponentDeactivate{
  avatar: File | null = null;
  avatarPreview: string | ArrayBuffer | null = null;

  signupForm: any
  isSubmitted = false;
  logInControl: any;
  constructor(private authService: AuthService, private Router: Router, private toastr: ToastrService) {
    this.createForm();
  }
  // Custom validator for password match
  private passwordMatchValidator: ValidatorFn = (control: AbstractControl) => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  };

  private createForm() {
    this.signupForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[a-zA-Z0-9]+$/)
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[a-zA-Z0-9]+$/)
      ]),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[a-zA-Z0-9]+$/)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
        Validators.minLength(8)
      ]),
      confirmPassword: new FormControl('', Validators.required)
    }, { validators: this.passwordMatchValidator });
  }

  get formControls() {
    return this.signupForm.controls;
  }

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

  // ✅ فتح input بتاع الصورة عند الضغط على ✏️
  triggerFileInput(fileInput: HTMLInputElement) {
    fileInput.click();
  }
  onSubmit() {
  this.isSubmitted = true;

  if (this.signupForm.valid) {
    const formData = new FormData();
    formData.append("firstName", this.signupForm.get("firstName")?.value);
    formData.append("lastName", this.signupForm.get("lastName")?.value);
    formData.append("userName", this.signupForm.get("username")?.value);
    formData.append("email", this.signupForm.get("email")?.value);
    formData.append("password", this.signupForm.get("password")?.value);

    if (this.avatar) {
      formData.append("avatar", this.avatar);
    }

    this.authService.signup(formData).subscribe(
      (res) => {
        console.log(res)
        this.toastr.success(res.message);
        this.Router.navigate(['/']);
      },
      (err) => this.toastr.warning(err.error.message)
      );
    
  }
}



  canDeactivate(): boolean {
    if (this.signupForm.dirty && !this.isSubmitted) {
      return confirm("Are you sure you want to leave without saving?");
    }
    return true;
  }

}
