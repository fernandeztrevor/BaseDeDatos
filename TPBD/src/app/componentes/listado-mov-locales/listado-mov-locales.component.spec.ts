import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoMovLocalesComponent } from './listado-mov-locales.component';

describe('ListadoMovLocalesComponent', () => {
  let component: ListadoMovLocalesComponent;
  let fixture: ComponentFixture<ListadoMovLocalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoMovLocalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoMovLocalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
