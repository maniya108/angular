import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { ILoginModel, IResponseModel } from './../../models/auth.model';
import { CoreService } from '../../core/services/core.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'gim-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly coreService: CoreService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [
        'assignmentuser@gmail.com',
        Validators.compose([Validators.required, Validators.email]),
      ],
      password: ['qwerty123', Validators.compose([Validators.required])],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }
    this.coreService
      .login(this.loginForm.getRawValue() as ILoginModel)
      .subscribe({
        next: (res: IResponseModel) => {
          if (res?.responseCode === 200) {
            this.router.navigateByUrl('/dashboard');
          }
          this.snackBar.open(res?.message, '', { duration: 5000 });
        },
        error: (error: HttpErrorResponse) => {
          this.snackBar.open(error?.error?.message, '', { duration: 5000 });
        },
      });
  }
}
