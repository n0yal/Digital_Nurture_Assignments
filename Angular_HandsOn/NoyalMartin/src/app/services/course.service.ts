import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, retry, tap, switchMap } from 'rxjs/operators';
import { Course } from '../models/course.model';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private apiUrl = 'http://localhost:3000/courses';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl).pipe(
      map(courses => courses.filter(c => c.credits > 0)),
      tap(courses => console.log('Courses loaded:', courses.length)),
      retry(2),
      catchError(err => {
        console.error(err);
        return throwError(() => new Error('Failed to load courses. Please try again.'));
      })
    );
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`).pipe(
      catchError(err => throwError(() => new Error('Could not load course details.')))
    );
  }

  createCourse(course: Omit<Course,'id'>): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course);
  }

  updateCourse(id: number, course: Partial<Course>): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${id}`, course);
  }

  deleteCourse(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getStudentsByCourse(courseId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${courseId}/students`).pipe(
      catchError(err => throwError(() => new Error('Failed to load students.')))
    );
  }

  // switchMap example: cancel previous request if courseId changes quickly
  getCourseWithStudents(courseId: number): Observable<any> {
    return this.http.get<Course>(`${this.apiUrl}/${courseId}`).pipe(
      // switchMap cancels the previous inner observable whenever a new courseId arrives
      switchMap(course => this.http.get<any[]>(`${this.apiUrl}/${courseId}/students`).pipe(
        map(students => ({ course, students }))
      )),
      catchError(err => throwError(() => err))
    );
  }
}
