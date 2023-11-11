import Playlist from './Playlist';
import Video from './Video';

export default class Channel {
  public uuid: string | undefined;
  public title: string | undefined;
  public subTitle: string | undefined;
  public description: string | undefined;
  public profile: string | undefined;
  public playlists: Array<Playlist> = new Array<Playlist>();
  public videos: Array<Video> = new Array<Video>();
}
