import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddColorsComponent } from './add-colors.component';

describe('AddColorsComponent', () => {
  let component: AddColorsComponent;
  let fixture: ComponentFixture<AddColorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddColorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
