import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CourseService } from './course.service';
import { Course } from '../models/course.model';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  const mockCourses: Course[] = [
    { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Algorithms', code: 'CS201', credits: 3, gradeStatus: 'pending' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CourseService]
    });
    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch courses and return exactly 2', () => {
    service.getCourses().subscribe(courses => {
      expect(courses.length).toBe(2);
    });
    const req = httpMock.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  it('should return an error message when server returns 500', () => {
    service.getCourses().subscribe({
      next: () => fail('should have failed'),
      error: (err) => expect(err.message).toContain('Failed to load courses')
    });
    const req = httpMock.expectOne('http://localhost:3000/courses');
    // flush error for original + 2 retries
    req.flush('Error', { status: 500, statusText: 'Server Error' });
    const req2 = httpMock.expectOne('http://localhost:3000/courses');
    req2.flush('Error', { status: 500, statusText: 'Server Error' });
    const req3 = httpMock.expectOne('http://localhost:3000/courses');
    req3.flush('Error', { status: 500, statusText: 'Server Error' });
  });
});
