import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { CourseSummaryWidgetComponent } from '../course-summary-widget/course-summary-widget.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, RouterLink, CourseSummaryWidgetComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  portalName = 'Student Course Portal';
  isPortalActive = true;
  searchTerm = '';
  message = '';
  coursesCount = 0;

  ngOnInit() {
    console.log('HomeComponent initialised — courses loaded');
    // load live course count for stats
    this.courseService.getCourses().subscribe({
      next: c => this.coursesCount = c.length,
      error: () => this.coursesCount = 0
    });
  }

  ngOnDestroy() {
    console.log('HomeComponent destroyed');
  }

  onEnrollClick() {
    this.message = 'Enrollment opened!';
  }

  onSearchClick() {
    // placeholder for search navigation
  }

  constructor(public courseService: CourseService) {}
}
