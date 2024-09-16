import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonVerComponent } from './boton-ver.component';

describe('BotonVerComponent', () => {
  let component: BotonVerComponent;
  let fixture: ComponentFixture<BotonVerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotonVerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BotonVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
