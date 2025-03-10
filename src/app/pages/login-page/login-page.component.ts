import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UsersService } from '../../services/users-service/users.service';

@Component({
  selector: 'app-login-page',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  detailsNotMatch: boolean = false;
  loginButtonWasClicked: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private usersService: UsersService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [, Validators.required],
      password: [, [Validators.required, this.customPasswordValidator]]
    })
  }

  closeNoMatchModal() {
    this.detailsNotMatch = false;
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

  invalidPasswordMessage() {
    const errors = this.loginForm.get("password").errors;

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

  handleSubmit() {
    this.usersService.login({
      email: this.loginForm.get("email").value as string,
      password: this.loginForm.get("password").value as string
    }).subscribe({
      next: () => {
        this.router.navigate(["/all-heroes"]);
      },
      error: () => {
        this.detailsNotMatch = true;
      }
    })
  }
}
