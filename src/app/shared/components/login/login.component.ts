import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '@app/core/service/auth/auth.service';
import { Observable, catchError } from 'rxjs';
import { Store } from '@ngrx/store';
import AuthDetail from '@app/data/schema/AuthDetail';
import { setUserDetails } from '@app/core/store/authStore/auth.actions';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Output('closeModals') closeModals: EventEmitter<any> = new EventEmitter();

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  submitted: boolean = false;

  authDetails: Observable<AuthDetail>;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private store: Store<{ auth: AuthDetail }>
  ) {
    this.authDetails = this.store.select('auth');
  }

  handleLogin(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      console.log('invalid form');
      return;
    }
    let validatedData = this.loginForm.value;
    this.authService
      .login(validatedData.email, validatedData.password)
      .subscribe({
        next: (data) => {
          console.log(data);

          if (data.status === 200) {
            localStorage.setItem('authDetails', JSON.stringify(data.body));
            this.store.dispatch(setUserDetails(data.body ?? new AuthDetail()));
          } else {
            alert('Authentication failed !! ');
          }
        },
        error: () => {
          alert(
            'Authentication failed !! Please check email and password 😐😐😐 '
          );
        },
      });
    // close modals
    this.closeModals.emit();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });

    this.loginForm.setValue({ email: 'admin@test.com', password: '1234' });
  }
}
