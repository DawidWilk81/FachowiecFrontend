import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsUnloggedComponent } from './details-unlogged.component';

describe('DetailsUnloggedComponent', () => {
  let component: DetailsUnloggedComponent;
  let fixture: ComponentFixture<DetailsUnloggedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsUnloggedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsUnloggedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
