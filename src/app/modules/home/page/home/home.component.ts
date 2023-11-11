import { Component, OnInit } from '@angular/core';
import { CONSTANTS } from '@app/core/constants/Constants';
import Video from '@app/data/schema/Video';
import DummyDataService from '@app/data/service/dummyData/dummy-data.service';
import { VideoService } from '@app/data/service/video/video.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  videos: Array<Video> = [];
  imageRoot: string = CONSTANTS.imageServerRoot;
  constructor(private videoService: VideoService) {}

  kkb() {
    console.log('kkb');
  }
  ngOnInit(): void {
    this.videoService.getVideos().subscribe((data) => {
      this.videos = data;
    });
  }
}
