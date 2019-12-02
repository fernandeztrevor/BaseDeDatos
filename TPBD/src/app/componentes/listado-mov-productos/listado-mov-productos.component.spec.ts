import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoMovProductosComponent } from './listado-mov-productos.component';

describe('ListadoMovProductosComponent', () => {
  let component: ListadoMovProductosComponent;
  let fixture: ComponentFixture<ListadoMovProductosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoMovProductosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoMovProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
