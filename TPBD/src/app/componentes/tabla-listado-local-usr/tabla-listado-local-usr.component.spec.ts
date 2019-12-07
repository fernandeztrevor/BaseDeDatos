import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaListadoLocalUsrComponent } from './tabla-listado-local-usr.component';

describe('TablaListadoLocalUsrComponent', () => {
  let component: TablaListadoLocalUsrComponent;
  let fixture: ComponentFixture<TablaListadoLocalUsrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaListadoLocalUsrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaListadoLocalUsrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
