import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-summary-widget',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="summary-widget">
      <h4>Course Summary</h4>
      <p>Total courses: {{ courseCount }}</p>
    </div>
  `,
  styleUrl: './course-summary-widget.component.css'
})
export class CourseSummaryWidgetComponent implements OnInit {
  courseCount = 0;

  constructor(public courseService: CourseService) {}

  ngOnInit() {
    this.courseService.getCourses().subscribe({
      next: (c: Course[]) => this.courseCount = c.length,
      error: () => this.courseCount = 0
    });
  }
}
