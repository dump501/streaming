import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSTANTS } from '@app/core/constants/Constants';
import Playlist from '@app/data/schema/Playlist';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  constructor(private http: HttpClient) {}

  createPlaylist(playlistData: {
    channel: string;
    title: string;
    description: string;
  }) {
    return this.http.post<Playlist>(
      `${CONSTANTS.apiRoot}/playlist`,
      playlistData,
      {
        observe: 'response',
      }
    );
  }

  getPlaylist(id: string) {
    return this.http.get<Playlist>(`${CONSTANTS.apiRoot}/channel`, {
      observe: 'response',
    });
  }
}
