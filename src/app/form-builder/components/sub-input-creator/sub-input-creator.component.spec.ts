import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubInputCreatorComponent } from './sub-input-creator.component';

describe('SubInputCreatorComponent', () => {
  let component: SubInputCreatorComponent;
  let fixture: ComponentFixture<SubInputCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubInputCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubInputCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
