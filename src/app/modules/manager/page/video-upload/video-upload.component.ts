import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { GlobalService } from '@app/core/service/global/global.service';
import Video from '@app/data/schema/Video';
import { VideoService } from '@app/data/service/video/video.service';

@Component({
  selector: 'app-video-upload',
  templateUrl: './video-upload.component.html',
  styleUrls: ['./video-upload.component.scss'],
})
export class VideoUploadComponent implements OnInit {
  @Input() dismiss = () => {};
  @Input() channel: string | undefined;
  thumbnail: File | null = null;
  videoContent: File | null = null;

  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
  });
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private videoService: VideoService,
    private globalService: GlobalService
  ) {}

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  async handleVideoUpload() {
    this.submitted = true;
    if (this.form.invalid) {
      console.log('invalid form');
      return;
    }
    let validatedData = this.form.value;
    console.log(validatedData);

    if (!this.thumbnail) {
      alert('You need to upload the thumbnail');
    }

    if (!this.videoContent) {
      alert('You need to upload the video');
    }

    // upload the thumbnail
    let formData = new FormData();
    formData.append('file', this.thumbnail!);

    this.globalService.uploadImage(formData).subscribe({
      next: (data: any) => {
        // if upload is ok
        if (data.status === 200) {
          let thumbnailName = data.body!.file!;
          console.log(thumbnailName);

          // upload video
          let videoForm = new FormData();
          videoForm.append('file', this.videoContent!);
          this.globalService.uploadVideo(videoForm).subscribe({
            next: (data: any) => {
              // upload video ok
              if (data.status === 200) {
                let videoName = data.body!.file!;
                console.log(videoName);

                // create video
                let video = new Video();
                video.title = validatedData.title;
                video.description = validatedData.description;
                video.thumbnail = thumbnailName;
                video.name = videoName;

                this.videoService
                  .createVideo({
                    channel: this.channel!,
                    title: validatedData.title,
                    description: validatedData.description,
                    thumbnail: thumbnailName,
                    name: videoName,
                  })
                  .subscribe({
                    next: (data) => {
                      if (data.status === 200) {
                        console.log(data.body);
                      }
                    },
                    error: (err) => {
                      console.log(err);

                      alert('Failed to create video');
                    },
                  });
              }
            },
            error: (err) => {
              alert('failed to upload video');
              console.log(err);
            },
          });
        }
      },
      error: (err) => {
        console.log(err);

        alert('failed to upload thumbnail');
      },
    });
  }

  handleFileChange(event: any) {
    this.thumbnail = event.target.files[0];
    console.log(this.thumbnail);
  }

  handleVideoChange(event: any) {
    this.videoContent = event.target.files[0];
    console.log(this.videoContent);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(4)]],
    });
  }
}
