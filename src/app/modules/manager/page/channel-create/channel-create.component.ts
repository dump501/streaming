import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-channel-create',
  templateUrl: './channel-create.component.html',
  styleUrls: ['./channel-create.component.scss'],
})
export class ChannelCreateComponent implements OnInit {
  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    subTitle: new FormControl(''),
    description: new FormControl(''),
    profile: new FormControl(null),
  });
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder) {}

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      profile: [null, [Validators.required]],
    });
  }
}
