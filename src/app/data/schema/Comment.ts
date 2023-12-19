import Like from './Like';
import User from './User';
import Video from './Video';

export default class Comment {
  public uuid: string | undefined;
  public content: string | undefined;
  public video: Video = new Video();
  public author: User = new User();
  // public parentComment: Comment = new Comment();
  public comments: Array<Comment> = new Array<Comment>();
  public likes: Array<Like> = new Array<Like>();
}
