import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CONSTANTS } from '@app/core/constants/Constants';
import { dataState } from '@app/core/types/types';
import Channel from '@app/data/schema/Channel';
import { ChannelService } from '@app/data/service/channel/channel.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-channel-show',
  templateUrl: './channel-show.component.html',
  styleUrls: ['./channel-show.component.scss'],
})
export class ChannelShowComponent implements OnInit {
  channel: Channel = new Channel();
  imageRoot: string = CONSTANTS.imageServerRoot;

  constructor(
    private route: ActivatedRoute,
    private channelService: ChannelService,
    private store: Store<{ data: dataState }>
  ) {
    this.store.select('data').subscribe((data) => {
      console.log(data);

      this.channel = data.channelShow;
    });
  }

  ngOnInit(): void {}
}
