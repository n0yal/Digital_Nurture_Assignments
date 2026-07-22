import { Injectable } from '@angular/core';
import { CourseService } from './course.service';
import { Course } from '../models/course.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class EnrollmentService {
  private enrolledCourseIds: number[] = [];

  constructor(private courseService: CourseService, private http: HttpClient) {}

  enroll(courseId: number): void {
    if (!this.enrolledCourseIds.includes(courseId)) {
      this.enrolledCourseIds.push(courseId);
    }
  }

  unenroll(courseId: number): void {
    this.enrolledCourseIds = this.enrolledCourseIds.filter(id => id !== courseId);
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourseIds.includes(courseId);
  }

  getEnrolledCourses(): Observable<Course[]> {
    const allCourses = this.courseService.getCourses();
    return of(this.enrolledCourseIds).pipe(
      switchMap(ids => {
        if (ids.length === 0) return of([]);
        return of([]);
      }),
      catchError(err => throwError(() => err))
    );
  }

  getEnrolledIds(): number[] {
    return [...this.enrolledCourseIds];
  }

  getStudentsByCourse(courseId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/courses/${courseId}/students`).pipe(
      catchError(err => throwError(() => new Error('Failed to load students.')))
    );
  }
}
