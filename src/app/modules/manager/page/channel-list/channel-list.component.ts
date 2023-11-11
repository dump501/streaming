import { Component, OnInit } from '@angular/core';
import { CONSTANTS } from '@app/core/constants/Constants';
import Channel from '@app/data/schema/Channel';
import { UserService } from '@app/data/service/user/user.service';

@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrls: ['./channel-list.component.scss'],
})
export class ChannelListComponent implements OnInit {
  channels: Array<Channel> = new Array<Channel>();
  imageRoot: string = CONSTANTS.imageServerRoot;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getProfile().subscribe((data) => {
      this.channels = data.channels;
      console.log(data);
    });
  }
}
