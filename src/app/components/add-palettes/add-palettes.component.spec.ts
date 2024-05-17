import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPalettesComponent } from './add-palettes.component';

describe('AddPalettesComponent', () => {
  let component: AddPalettesComponent;
  let fixture: ComponentFixture<AddPalettesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPalettesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddPalettesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
