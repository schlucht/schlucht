import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(
  passwordKey: string,
  confirmPasswordKey: string
): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {

    const passwordControl = formGroup.get(passwordKey);
    const confirmPasswordControl = formGroup.get(confirmPasswordKey);

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    const password = passwordControl.value;
    const confirmPassword = confirmPasswordControl.value;

    if (password !== confirmPassword) {
      confirmPasswordControl.setErrors({
        passwordMismatch: true
      });

      return {
        passwordMismatch: true
      };
    }

    // entfernt nur den passwordMismatch Fehler
    if (confirmPasswordControl.hasError('passwordMismatch')) {

      const errors = { ...confirmPasswordControl.errors };

      delete errors['passwordMismatch'];

      confirmPasswordControl.setErrors(
        Object.keys(errors).length ? errors : null
      );
    }

    return null;
  };
}