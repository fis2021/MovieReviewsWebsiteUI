import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieInfoDialogComponent } from './movie-info-dialog.component';

describe('MovieInfoDialogComponent', () => {
  let component: MovieInfoDialogComponent;
  let fixture: ComponentFixture<MovieInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieInfoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
