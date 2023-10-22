import { Component } from '@angular/core';
import { UploadService } from './upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent {
  file?: File;

  constructor(private uploadService: UploadService) {}

  handleFileChange(event: any) {
    this.file = event.target.files[0];
  }

  upload() {
    console.log('Getting upload url');
    console.log(this.file?.type);

    this.uploadService
      .getUploadUrl(this.file?.name ?? '')
      .subscribe((urlResponse: any) => {
        if (urlResponse.hasOwnProperty('url')) {
          let formData = new FormData();
          formData.append('file', this.file!);
          let url: string = urlResponse?.url ?? '';
          console.log(url);

          this.uploadService.upload(url, formData).subscribe((data) => {
            console.log(data);
          });
        }
      });
  }
}
