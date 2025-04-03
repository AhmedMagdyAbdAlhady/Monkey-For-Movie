import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../../srever/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  standalone: false,
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  constructor(private authService: AuthService, private Router: Router) { }
  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required, Validators.minLength(10)]),
    password: new FormControl(null, [Validators.required])
  })
  isSubmited: boolean = false
  get formControls() {
    return this.loginForm.controls
  }
  handleSubmit() {
    this.isSubmited = true

    if (this.loginForm.valid) {
      const userData = {
        email: this.formControls.email.value,
        password: this.formControls.password.value
      };
      this.authService.login(userData.email, userData.password).subscribe(
        (msg) =>{
          this.authService.user=msg.user
          this.authService.islogIn = true
        //  console.log(msg.user) 
        },
        (err) => console.error(err.message),
        () => {
          this.authService.islogIn = true
          this.Router.navigate(['/'])
          console.log(this.authService.isAuthenticated())
          console.log(this.authService.user)
        }
      );
    }
  }
  ngOnInit() {

  }

}
