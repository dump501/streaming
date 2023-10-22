import { Component, OnInit } from '@angular/core';
import Video from '@app/data/schema/Video';
import DummyDataService from '@app/data/service/dummyData/dummy-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  videos: Array<Video>;
  constructor(private dummyData: DummyDataService){
    this.videos = dummyData.getVideos();
    console.log(this.videos);

  }

  kkb(){
    console.log("kkb");

  }
  ngOnInit(): void {
  }

}
