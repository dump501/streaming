import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CONSTANTS } from '@app/core/constants/Constants';
import { setChannelShow } from '@app/core/store/dataStore/data.actions';
import { dataState } from '@app/core/types/types';
import Channel from '@app/data/schema/Channel';
import { UserService } from '@app/data/service/user/user.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrls: ['./channel-list.component.scss'],
})
export class ChannelListComponent implements OnInit {
  channels: Array<Channel> = new Array<Channel>();
  imageRoot: string = CONSTANTS.imageServerRoot;
  constructor(
    private userService: UserService,
    private router: Router,
    private store: Store<{ data: dataState }>
  ) {}

  showChannelDetails(channel: Channel) {
    this.store.dispatch(setChannelShow(channel));
    this.router.navigate(['/manager/channel/show']);
  }

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: (data) => {
        console.log(data);
        if (data.status === 200) {
          this.channels = data.body?.channels ?? [];
        } else {
          alert('error while loading data');
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
