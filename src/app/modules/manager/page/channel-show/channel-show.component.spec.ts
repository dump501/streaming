import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelShowComponent } from './channel-show.component';

describe('ChannelShowComponent', () => {
  let component: ChannelShowComponent;
  let fixture: ComponentFixture<ChannelShowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChannelShowComponent]
    });
    fixture = TestBed.createComponent(ChannelShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
