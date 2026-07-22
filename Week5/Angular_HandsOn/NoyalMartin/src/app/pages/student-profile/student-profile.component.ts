import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentService } from '../../services/enrollment.service';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-student-profile',
  imports: [CommonModule],
  templateUrl: './student-profile.component.html',
  styleUrl: './student-profile.component.css'
})
export class StudentProfileComponent implements OnInit {
  enrolledCourses: any[] = [];

  constructor(
    private enrollmentService: EnrollmentService,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    this.loadEnrolled();
  }

  loadEnrolled() {
    this.courseService.getCourses().subscribe({
      next: (all: any) => {
        const ids = this.enrollmentService.getEnrolledIds();
        this.enrolledCourses = all.filter((c: any) => ids.includes(c.id));
      },
      error: () => {
        const ids = this.enrollmentService.getEnrolledIds();
        this.enrolledCourses = ids.map((id: number) => ({ id } as any));
      }
    });
  }
}
