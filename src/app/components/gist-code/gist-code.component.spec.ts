import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GistCodeComponent } from './gist-code.component';

describe('GistCodeComponent', () => {
  let component: GistCodeComponent;
  let fixture: ComponentFixture<GistCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GistCodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GistCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
