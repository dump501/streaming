import Video from './Video';

export default class Playlist {
  public uuid: string | undefined;
  public title: string | undefined;
  public description: string | undefined;
  public videos: Array<Video> = new Array<Video>();
}
