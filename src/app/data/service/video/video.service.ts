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

  createVideo(data: {
    channel: string;
    title: string;
    description: string;
    thumbnail: string;
    name: string;
  }) {
    return this.http.post<Video>(`${CONSTANTS.apiRoot}/video`, data, {
      observe: 'response',
    });
  }

  getVideo(uuid: string) {
    return this.http.get<Video>(`${CONSTANTS.apiRoot}/video/${uuid}`, {
      observe: 'response',
    });
  }
}
