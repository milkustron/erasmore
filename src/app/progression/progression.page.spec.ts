import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { ProgressionPage } from './progression.page';

describe('ProgressionPage', () => {
  let component: ProgressionPage;
  let fixture: ComponentFixture<ProgressionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgressionPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
