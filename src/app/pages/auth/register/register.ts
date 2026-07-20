import { Component, computed, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { passwordMatchValidator } from '../../../core/validators/passwordValidator';
import { emailExistsValidator } from '../../../core/validators/emailConfirmValidator';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user/user';

@Component({
  selector: 'ots-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  private userService = inject(UserService);

  isSubmitting = computed(() => false);
  registerForm = new FormGroup({
    firstname: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      emailExistsValidator()
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),   
    password_confirm: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),   
  }, 
  {
    validators: passwordMatchValidator('password', 'password_confirm'),
  }
);
  onSubmit(){    
    if(this.registerForm.invalid){      
      this.userService.newUser(this.registerForm.value as User)?.subscribe({
        next: n => console.log(n),
        error: e => console.error(e)
      })
    }
    return false;
  }
}
