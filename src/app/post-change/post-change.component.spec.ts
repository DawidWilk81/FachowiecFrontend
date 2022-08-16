import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostChangeComponent } from './post-change.component';

describe('PostChangeComponent', () => {
  let component: PostChangeComponent;
  let fixture: ComponentFixture<PostChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostChangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
