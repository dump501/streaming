import { Component, OnInit } from '@angular/core';
import User from '@app/data/schema/User';
import { UserService } from '@app/data/service/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user: User = new User();
  playlistCount: number = 0;
  videoCount: number = 0;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getProfile().subscribe((data) => {
      if (data.status === 200) {
        this.user = data.body ?? new User();
        for (const channel of this.user.channels) {
          for (const p of channel.playlists) {
            this.playlistCount++;
          }
          for (const v of channel.videos) {
            this.videoCount++;
          }
        }
      } else {
        alert('Error while loading data');
      }
    });
  }
}
