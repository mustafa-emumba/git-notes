import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourGistsComponent } from './your-gists.component';

describe('YourGistsComponent', () => {
  let component: YourGistsComponent;
  let fixture: ComponentFixture<YourGistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [YourGistsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YourGistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
