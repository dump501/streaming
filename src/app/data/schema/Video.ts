import Channel from './Channel';
import Comment from './Comment';
import Playlist from './Playlist';

export default class Video {
  public uuid: string | undefined;
  public title: string | undefined;
  public name: string | undefined;
  public description: string | undefined;
  public thumbnail: string | undefined;
  public channel: Channel = new Channel();
  public playlist: Playlist = new Playlist();
  public comments: Array<Comment> = new Array<Comment>();
}
