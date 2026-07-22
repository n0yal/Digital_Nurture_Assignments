import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseCardComponent } from '../../components/course-card/course-card.component';
import { CourseService } from '../../services/course.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { Course } from '../../models/course.model';
import { Store } from '@ngrx/store';
import * as CourseActions from '../../store/course/course.actions';
import { selectAllCourses } from '../../store/course/course.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CourseCardComponent],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {
  courses$: Observable<Course[]> = new Observable<Course[]>();
  isLoading = true;
  selectedCourseId: number | null = null;
  searchTerm = '';

  ngOnInit() {
    this.courses$ = this.store.select(selectAllCourses);
    this.store.dispatch(CourseActions.loadCourses());

    setTimeout(() => {
      this.isLoading = false;
    }, 1500);

    // read search query param from url
    const search = this.route.snapshot.queryParamMap.get('search');
    if (search) {
      this.searchTerm = search;
    }
  }

  constructor(
    private courseService: CourseService,
    private store: Store,
    private enrollmentService: EnrollmentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  trackByCourseId(index: number, course: Course) {
    return course.id;
  }

  onEnroll(courseId: number) {
    console.log('Enrolling in course: ' + courseId);
    this.selectedCourseId = courseId;
    this.enrollmentService.enroll(courseId);
  }

  onSearchChange(value: string) {
    this.router.navigate(['courses'], { queryParams: { search: value } });
  }
}
