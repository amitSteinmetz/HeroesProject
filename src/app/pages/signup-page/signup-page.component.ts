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

  constructor(private fb: FormBuilder, private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: [, [Validators.required, this.customUserNameValidator(this.usersService)]],
      age: [, Validators.required],
      email: [, [Validators.required, Validators.email, this.customEmailValidator(this.usersService)]],
      password: [, [Validators.required, this.customPasswordValidator]],
      passwordRepeat: [, Validators.required]
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
    const passwordRepeat = control.get("passwordRepeat")?.value as string;

    return (password !== passwordRepeat) ? { "notSamePasswords": true } : null;
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
    const errors = this.signupForm.get("passwordRepeat").errors;
    const formErrors = this.signupForm.errors;

    if (errors?.["required"])
      return "You must enter password again";

    if (formErrors?.["notSamePasswords"])
      return "Two passwords must be identical";

    return "";
  }

  invalidUserNameMessage() {
    const errors = this.signupForm.get("username").errors;

    if (errors?.["required"])
      return "You must enter username";

    if (errors?.["taken"])
      return "This username is already in use";

    return "";
  }

  invalidEmailMessage() {
    const errors = this.signupForm.get("email").errors;

    if (errors?.["required"])
      return "You must enter email";

    if (errors?.["taken"])
      return "This email is already in use";

    if (errors?.["email"])
      return "Invalid email format";

    return "";
  }

  customUserNameValidator(usersService: UsersService) {
    return (control: AbstractControl): ValidationErrors | null => {
      const userName: string = control.value as string;

      for (let i = 0; i < usersService.users.length; i++)
        if (userName === usersService.users[i].username)
          return { "taken": control.value }

      return null;
    }
  }

  customEmailValidator(usersService: UsersService) {
    return (control: AbstractControl): ValidationErrors | null => {
      const email: string = control.value as string;

      for (let i = 0; i < usersService.users.length; i++)
        if (email === usersService.users[i].email)
          return { "taken": control.value }

      return null;
    }
  }

  handleSubmit() {
    this.usersService.addUser({
      username: this.signupForm.get("username").value as string,
      age: this.signupForm.get("age").value as number,
      email: this.signupForm.get("email").value as string,
      password: this.signupForm.get("password").value as string
    })

    this.router.navigate(["/login"]);
  }
}
