import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../srever/auth.service';
import { ToastrService } from 'ngx-toastr';

import {  Router } from '@angular/router';

@Component({
  selector: 'app-singup',
  standalone: false,
  templateUrl: './singup.component.html',
  styleUrl: './singup.component.css'
})

export class SingupComponent {
  signupForm:any
  isSubmitted = false;
logInControl: any;
  constructor(private authService: AuthService , private Router:Router,private toastr: ToastrService) {
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

  onSubmit() {
    debugger
    
    this.isSubmitted = true;

    if (this.signupForm.valid) {
      const userData = {

        firstName: this.formControls.firstName.value,
        lastName: this.formControls.lastName.value,
        username: this.formControls.username.value,
        email: this.formControls.email.value,
        password: this.formControls.password.value
      };
      // console.log(userData);
        this.authService.signup(userData.firstName, userData.lastName, userData.username, userData.email, userData.password)
          .subscribe(
             (msg) => {
              this.toastr.success(msg.message);
              this.authService.user =msg.user
              console.log(msg)}
             ,
             (err) => console.error(err.message),
             ()=>{
              
              this.Router.navigate(['/'])
            }
          );
      console.log(this.authService.user)
      
    }
  }


}
