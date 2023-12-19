import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import Playlist from '@app/data/schema/Playlist';
import { PlaylistService } from '@app/data/service/playlist/playlist.service';

@Component({
  selector: 'app-playlist-create',
  templateUrl: './playlist-create.component.html',
  styleUrls: ['./playlist-create.component.scss'],
})
export class PlaylistCreateComponent implements OnInit {
  @Input() dismiss = () => {};
  @Input() channel: string | undefined;

  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
  });
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private playlistService: PlaylistService
  ) {}

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  handlePlaylistCreate() {
    this.submitted = true;
    if (this.form.invalid) {
      console.log('invalid form');
      return;
    }
    let validatedData = this.form.value;

    this.playlistService
      .createPlaylist({
        channel: this.channel!,
        title: validatedData.title,
        description: validatedData.description,
      })
      .subscribe({
        next: (data) => {
          if (data) {
            console.log(data);
          }
        },
        error: (err) => {
          alert('Error when creating playlist. Please try later');
        },
      });
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(4)]],
    });
  }
}
