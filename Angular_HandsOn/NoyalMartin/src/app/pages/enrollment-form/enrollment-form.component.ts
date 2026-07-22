import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './enrollment-form.component.html',
  styleUrl: './enrollment-form.component.css'
})
export class EnrollmentFormComponent {
  submitted = false;
  studentName = '';
  studentEmail = '';
  courseId: number | null = null;
  preferredSemester = 'Odd';
  agreeToTerms = false;

  onSubmit(form: NgForm) {
    console.log('Form value:', form.value);
    console.log('Form valid:', form.valid);
    if (form.valid) {
      this.submitted = true;
    }
  }

  onReset(form: NgForm) {
    form.resetForm();
    this.submitted = false;
    this.studentName = '';
    this.studentEmail = '';
    this.courseId = null;
    this.preferredSemester = 'Odd';
    this.agreeToTerms = false;
  }
}
