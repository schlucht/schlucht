import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';


@Component({
  selector: 'ots-signin',
  imports: [ReactiveFormsModule],
  templateUrl: './signin.html',
  styleUrl: './signin.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Signin {
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  isSubmitting = computed(() => this.authService.isLoading());
  errorMessage = computed(() => this.authService.error());

  signinForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });
  onSubmit(): void {
    if (this.signinForm.invalid) {
      return;
    }

    const { email, password } = this.signinForm.value;

    if (!email || !password) {
      return;
    }

    this.authService.login({ email, password }).subscribe({
      next: (response) => {
        this.signinForm.reset();
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
        this.router.navigateByUrl(returnUrl);
      },
      error: () => {
        // Fehler wird über authService.error() Signal angezeigt
      }
    });
  }
}
