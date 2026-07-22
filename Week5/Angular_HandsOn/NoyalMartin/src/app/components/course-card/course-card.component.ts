import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from '../../models/course.model';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';
import { HighlightDirective } from '../../directives/highlight.directive';
import { EnrollmentService } from '../../services/enrollment.service';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, CreditLabelPipe, HighlightDirective],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent implements OnChanges {
  @Input() course: any = { id: 0, name: '', code: '', credits: 0, gradeStatus: 'pending' };
  @Output() enrollRequested = new EventEmitter<number>();

  isExpanded = false;

  constructor(private enrollmentService: EnrollmentService) {}

  // trackBy helps Angular avoid re-rendering the whole list when only one item changes
  trackByCourseId(index: number, course: any) {
    return course.id;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['course']) {
      const prev = changes['course'].previousValue;
      const curr = changes['course'].currentValue;
      console.log('Course input changed:', { prev, curr });
    }
  }

  isCourseEnrolled(): boolean {
    return this.enrollmentService.isEnrolled(this.course.id);
  }

  onToggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  get cardClasses() {
    // getters keep templates clean by moving complex logic to the component class
    return {
      'card--enrolled': this.isCourseEnrolled(),
      'card--full': this.course.credits >= 4,
      'expanded': this.isExpanded
    };
  }

  get cardStyles() {
    const colorMap: any = { passed: 'green', failed: 'red', pending: 'grey' };
    return {
      'border-left': `4px solid ${colorMap[this.course.gradeStatus] || 'grey'}`
    };
  }
}
