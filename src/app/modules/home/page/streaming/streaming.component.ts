import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CONSTANTS } from '@app/core/constants/Constants';
import { AuthService } from '@app/core/service/auth/auth.service';
import Comment from '@app/data/schema/Comment';
import User from '@app/data/schema/User';
import Video from '@app/data/schema/Video';
import { CommentService } from '@app/data/service/comment/comment.service';
import { VideoService } from '@app/data/service/video/video.service';

@Component({
  selector: 'app-streaming',
  templateUrl: './streaming.component.html',
  styleUrls: ['./streaming.component.scss'],
})
export class StreamingComponent implements OnInit {
  uuid: string;
  video: Video = new Video();
  imageRoot: string = CONSTANTS.imageServerRoot;
  isCommentShow: boolean = false;
  comment: string = '';

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService,
    private authService: AuthService,
    private commentService: CommentService
  ) {
    this.uuid = this.route.snapshot.paramMap.get('uuid') ?? '';
  }

  setCommentShow(val: boolean) {
    this.isCommentShow = val;
  }

  handleCommentAdd() {
    // check if the user is authenticated
    if (!this.authService.isAuthenticated()) {
      alert('You need to be authenticated');
      return;
    }

    // check if the comment field is not null
    if (this.comment === '') {
      alert('Please enter a comment');
      return;
    }
    // add the comment
    let comment = new Comment();
    let authUser = new User();
    authUser.uuid = this.authService.getAuthenticatedUser().uuid;

    comment.author = authUser;
    comment.video = this.video;
    comment.content = this.comment;

    this.commentService.createComment(comment).subscribe({
      next: (data) => {
        if (data.status === 200) {
          console.log(data);
        }
      },
      error: (err) => {
        alert('failed to save the comment please try later');
      },
    });
    // close the comment section
    this.setCommentShow(false);
  }

  handleCommentChange(e: any) {
    this.comment = e.target.value;
  }

  ngOnInit(): void {
    this.videoService.getVideo(this.uuid).subscribe((data) => {
      if (data.status === 200) {
        this.video = data.body!;
        console.log(this.video);
      }
    });
  }
}
