import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSTANTS } from '@app/core/constants/Constants';
import Comment from '@app/data/schema/Comment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  createComment(comment: Comment) {
    return this.http.post<Comment>(
      `${CONSTANTS.apiRoot}/comment`,
      {
        content: comment.content,
        author: comment.author?.uuid,
        video: comment.video?.uuid,
      },
      {
        observe: 'response',
      }
    );
  }
}
