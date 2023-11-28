import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSTANTS } from '@app/core/constants/Constants';
import Channel from '@app/data/schema/Channel';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  constructor(private http: HttpClient) {}

  createChannel(channel: Channel) {
    return this.http.post<Channel>(`${CONSTANTS.apiRoot}/channel`, channel, {
      observe: 'response',
    });
  }

  getChannel(id: string) {
    return this.http.get<Channel>(`${CONSTANTS.apiRoot}/channel`, {
      observe: 'response',
    });
  }
}
