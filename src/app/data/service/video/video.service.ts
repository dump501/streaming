import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSTANTS } from '@app/core/constants/Constants';
import Video from '@app/data/schema/Video';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  constructor(private http: HttpClient) {}

  getVideos() {
    return this.http.get<Array<Video>>(`${CONSTANTS.apiRoot}/video`);
  }
}
