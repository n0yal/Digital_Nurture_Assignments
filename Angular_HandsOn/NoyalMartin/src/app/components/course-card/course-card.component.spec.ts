import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CourseCardComponent } from './course-card.component';
import { EnrollmentService } from '../../services/enrollment.service';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';
import { HighlightDirective } from '../../directives/highlight.directive';

describe('CourseCardComponent', () => {
  let component: CourseCardComponent;
  let fixture: ComponentFixture<CourseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCardComponent, CreditLabelPipe, HighlightDirective, HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display course name when input is set', () => {
    component.course = { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' };
    fixture.detectChanges();
    const nameEl = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(nameEl.textContent).toContain('Data Structures');
  });

  it('should emit enrollRequested event when button is clicked', () => {
    component.course = { id: 1, name: 'Test Course', code: 'CS100', credits: 3, gradeStatus: 'pending' };
    fixture.detectChanges();
    spyOn(component.enrollRequested, 'emit');
    fixture.debugElement.query(By.css('button')).nativeElement.click();
    fixture.detectChanges();
    expect(component.enrollRequested.emit).toHaveBeenCalledWith(1);
  });

  it('should log to console when course input changes', () => {
    spyOn(console, 'log');
    component.course = { id: 2, name: 'Algorithms', code: 'CS201', credits: 3, gradeStatus: 'pending' };
    component.ngOnChanges({
      course: {
        previousValue: null,
        currentValue: component.course,
        firstChange: true,
        isFirstChange: () => true
      }
    });
    expect(console.log).toHaveBeenCalled();
  });
});
