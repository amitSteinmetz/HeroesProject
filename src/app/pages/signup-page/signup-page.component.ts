import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { UsersService } from '../../services/users-service/users.service';

@Component({
  selector: 'app-signup-page',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css'
})
export class SignupPageComponent implements OnInit {
  signupForm: FormGroup;
  showTakenUserErrorModal: boolean = false;

  constructor(private fb: FormBuilder, private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: [, Validators.required],
      email: [, [Validators.required, Validators.email]],
      password: [, [Validators.required, this.customPasswordValidator]],
      confirmPassword: [, Validators.required]
    },
      { validators: this.customPasswordRepeatValidator })
  }

  customPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value as string;

    if (!password) return { "empty": "Password is required" };
    if (password.length < 8) return { "short": control.value };
    if (!/[A-Z]/.test(password)) return { "noUpperCase": control.value };
    if (!/\d/.test(password)) return { "noDigit": control.value };
    if (!/[^a-zA-Z0-9]/.test(password)) return { "noSpecialChar": control.value };

    return null;
  }

  customPasswordRepeatValidator(control: FormGroup): ValidationErrors | null {
    const password = control.get("password")?.value as string;
    const confirmPassword = control.get("confirmPassword")?.value as string;

    return (password !== confirmPassword) ? { "notSamePasswords": true } : null;
  }

  invalidPasswordMessage() {
    const errors = this.signupForm.get("password").errors;

    if (errors?.["required"])
      return "You must enter password";

    if (errors?.["short"])
      return "Password must be at least 8 characters";

    if (errors?.["noUpperCase"])
      return "Password must contain at least 1 uppercase letter";

    if (errors?.["noDigit"])
      return "Password must contain at least 1 digit";

    if (errors?.["noSpecialChar"])
      return "Password must contain at least 1 special letter";

    return "";
  }

  invalidpasswordRepeatMessage() {
    const errors = this.signupForm.get("confirmPassword").errors;
    const formErrors = this.signupForm.errors;

    if (errors?.["required"])
      return "You must enter password again";

    if (formErrors?.["notSamePasswords"])
      return "Two passwords must be identical";

    return "";
  }

  invalidEmailMessage() {
    const errors = this.signupForm.get("email").errors;

    if (errors?.["required"])
      return "You must enter email";

    if (errors?.["email"])
      return "Invalid email format";

    return "";
  }

  closeTakenUserErrorModal() {
    this.showTakenUserErrorModal = false;
  }

  handleSubmit() {
    this.usersService.signup({
      name: this.signupForm.get("name").value as string,
      email: this.signupForm.get("email").value as string,
      password: this.signupForm.get("password").value as string,
      confirmPassword: this.signupForm.get("confirmPassword").value as string,
    }).subscribe({
      next: () => {
        this.router.navigate(["/login"]);
      },
      error: () => {
        this.showTakenUserErrorModal = true;
      }
    });
  }
}













