import { Injectable } from '@angular/core';
import Video from '@app/data/schema/Video';

@Injectable({
  providedIn: 'root'
})
export default class DummyDataService {
  public videos = new Array<Video>
  public tik = "tik tok"

  constructor() {

    for (let i = 0; i < 10; i++) {
      let video = new Video()
      video.title = "Video" + i;
      video.description = `Description =${i}`
      video.uuid = `3fa85f64-5717-4562-b3fc-2c963f66afa${i}`
      video.thumbnail = "assets/images/api.png";
      this.videos.push(video)
    }
  }

  public getVideos(){

    return this.videos;
  }

  public getTik(){
    return this.tik;
  }

}
