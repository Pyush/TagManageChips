import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsManagerInputComponent } from './tags-manager-input.component';

describe('TagsManagerInputComponent', () => {
  let component: TagsManagerInputComponent;
  let fixture: ComponentFixture<TagsManagerInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsManagerInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsManagerInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
