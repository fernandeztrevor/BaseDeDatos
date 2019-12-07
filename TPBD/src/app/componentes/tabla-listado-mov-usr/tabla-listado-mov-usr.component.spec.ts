import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaListadoMovUsrComponent } from './tabla-listado-mov-usr.component';

describe('TablaListadoMovUsrComponent', () => {
  let component: TablaListadoMovUsrComponent;
  let fixture: ComponentFixture<TablaListadoMovUsrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaListadoMovUsrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaListadoMovUsrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
