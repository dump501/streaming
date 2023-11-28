import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { GlobalService } from '@app/core/service/global/global.service';
import Channel from '@app/data/schema/Channel';
import { ChannelService } from '@app/data/service/channel/channel.service';

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
  });
  submitted: boolean = false;
  profile: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private channelService: ChannelService,
    private globalService: GlobalService
  ) {}

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  handleFileChange(event: any) {
    this.profile = event.target.files[0];
    console.log(this.profile);
  }

  handleChannelCreate() {
    // check if the form is valid
    this.submitted = true;
    if (this.form.invalid) {
      console.log('invalid form');
      return;
    }
    console.log(this.form.value);

    // try to upload the profile image
    let formData = new FormData();
    formData.append('file', this.profile!);
    this.globalService.uploadImage(formData).subscribe({
      next: (data: any) => {
        // if upload is ok
        if (data.status === 200) {
          let profileUrl = data.body!.file!;
          let validatedData = this.form.value;

          let channel = new Channel();
          channel.title = validatedData.title;
          channel.subTitle = validatedData.subTitle;
          channel.description = validatedData.description;
          channel.profile = profileUrl;

          this.channelService.createChannel(channel).subscribe((response) => {
            if (response.status === 200) {
              console.log(response.body);
            }
          });
        }
      },
      error: (err) => {
        alert('failed to upload image please try later');
      },
    });
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      subTitle: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(4)]],
    });
  }
}
