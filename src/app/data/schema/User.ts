import Channel from './Channel';
import Playlist from './Playlist';
import Video from './Video';

export default class User {
  public uuid: string | undefined;
  public name: string | undefined;
  public email: string | undefined;
  public profile: string | undefined;
  public bio: string | undefined;
  public channels: Array<Channel> = new Array<Channel>();
}
