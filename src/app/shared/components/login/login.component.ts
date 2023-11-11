import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '@app/core/service/auth/auth.service';

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

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  handleLogin(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      console.log('invalid form');
      return;
    }
    let validatedData = this.loginForm.value;
    this.authService
      .login(validatedData.email, validatedData.password)
      .subscribe((data) => {
        if (Object.hasOwn(data, 'token')) {
          this.authService.setUserDetails(data);
          // close modals
          this.closeModals.emit();
        }
      });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }
}
