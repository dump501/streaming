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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @Output('closeModals') closeModals: EventEmitter<any> = new EventEmitter();
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  handleRegister(): void {
    this.submitted = true;
    if (this.registerForm.invalid) {
      console.log('invalid form');
      return;
    }
    let validatedData = this.registerForm.value;
    this.authService
      .register(validatedData.name, validatedData.email, validatedData.password)
      .subscribe((data) => {
        console.log(data);
        this.closeModals.emit();
      });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }
}
