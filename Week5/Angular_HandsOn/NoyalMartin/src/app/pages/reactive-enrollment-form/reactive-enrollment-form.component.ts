import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { CanComponentDeactivate } from '../../guards/unsaved-changes.guard';

@Component({
  selector: 'app-reactive-enrollment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './reactive-enrollment-form.component.html',
  styleUrl: './reactive-enrollment-form.component.css'
})
export class ReactiveEnrollmentFormComponent implements OnInit, CanComponentDeactivate {
  enrollForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private courseService: CourseService) {
    this.enrollForm = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      studentEmail: ['', [Validators.required, Validators.email], [this.simulateEmailCheck()]],
      courseId: ['', [Validators.required, this.noCourseCode]],
      preferredSemester: ['Odd', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue],
      additionalCourses: this.fb.array([])
    });
  }

  ngOnInit() {}

  get additionalCourses() {
    return this.enrollForm.get('additionalCourses') as FormArray;
  }

  private noCourseCode(control: import('@angular/forms').AbstractControl): import('@angular/forms').ValidationErrors | null {
    const value = control.value;
    if (typeof value === 'string' && value.startsWith('XX')) {
      return { noCourseCode: true };
    }
    return null;
  }

  private simulateEmailCheck() {
    return (control: import('@angular/forms').AbstractControl) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (control.value && control.value.includes('test@')) {
            resolve({ emailTaken: true });
          } else {
            resolve(null);
          }
        }, 800);
      });
    };
  }

  // enrollForm.value returns the form value but excludes disabled controls,
  // whereas enrollForm.getRawValue() returns ALL control values including disabled ones.
  onSubmit() {
    console.log('enrollForm.value:', this.enrollForm.value);
    console.log('enrollForm.getRawValue():', this.enrollForm.getRawValue());
    if (this.enrollForm.valid) {
      this.submitted = true;
      this.courseService.createCourse({
        name: this.enrollForm.value.studentName,
        code: this.enrollForm.value.courseId as string,
        credits: 3,
        gradeStatus: 'pending'
      }).subscribe();
    }
  }

  addCourse() {
    this.additionalCourses.push(this.fb.control('', Validators.required));
  }

  removeCourse(index: number) {
    this.additionalCourses.removeAt(index);
  }

  canDeactivate(): boolean {
    // If form is dirty, ask user before leaving
    if (this.enrollForm.dirty && !this.submitted) {
      return window.confirm('You have unsaved changes. Leave?');
    }
    return true;
  }
}
