import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRecomendadosComponent } from './lista-recomendados.component';

describe('ListaRecomendadosComponent', () => {
  let component: ListaRecomendadosComponent;
  let fixture: ComponentFixture<ListaRecomendadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaRecomendadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaRecomendadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
