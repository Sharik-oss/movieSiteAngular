import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KinoboxplayerComponent } from './kinoboxplayer.component';

describe('KinoboxplayerComponent', () => {
  let component: KinoboxplayerComponent;
  let fixture: ComponentFixture<KinoboxplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KinoboxplayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KinoboxplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
