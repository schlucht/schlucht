import { Component, computed } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { passwordMatchValidator } from '../../../core/validators/passwordValidator';
import { emailExistsValidator } from '../../../core/validators/emailConfirmValidator';

@Component({
  selector: 'ots-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

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
    console.log(this.registerForm.invalid)
    if(this.registerForm.invalid){
      return true;
    }
    return false;
  }
}
