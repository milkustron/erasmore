import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HighlightDetailsPage } from './highlight-details.page';

describe('HighlightDetailsPage', () => {
  let component: HighlightDetailsPage;
  let fixture: ComponentFixture<HighlightDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlightDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
