import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CONSTANTS } from '@app/core/constants/Constants';
import { dataState } from '@app/core/types/types';
import Channel from '@app/data/schema/Channel';
import { ChannelService } from '@app/data/service/channel/channel.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
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
    private router: Router,
    private channelService: ChannelService,
    private store: Store<{ data: dataState }>,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    // config modal
    config.backdrop = 'static';
    this.store.select('data').subscribe((data) => {
      if (data && data.channelShow.uuid) {
        this.channel = data.channelShow;
      } else {
        router.navigate(['/manager/channel']);
      }
    });
  }

  open(content: any) {
    this.modalService.open(content);
  }

  ngOnInit(): void {}
}
