import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private http: HttpClient) {}

  getUploadUrl(fileName: string) {
    return this.http.get(
      `http://localhost:8080/file/upload_url?fileName=${fileName}`
    );
  }
  upload(url: string, data: FormData) {
    return this.http.put(url, data);
  }
}
