// src/app/survey-page/survey-page.component.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-survey-page',
  templateUrl: './survey-page.component.html',
  styleUrls: ['./survey-page.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule]
})
export class SurveyPageComponent {
  surveyForm: FormGroup;
  surveyId: number | null = null;

  campusLikesOptions = [
    { name: 'students', label: 'Students' },
    { name: 'location', label: 'Location' },
    { name: 'campus', label: 'Campus' },
    { name: 'atmosphere', label: 'Atmosphere' },
    { name: 'dormRooms', label: 'Dorm Rooms' },
    { name: 'sports', label: 'Sports' }
  ];

  interestedInOptions = [
    { value: 'friends', label: 'Friends' },
    { value: 'television', label: 'Television' },
    { value: 'internet', label: 'Internet' },
    { value: 'other', label: 'Other' }
  ];

  recommendationOptions = ['Very Likely', 'Likely', 'Unlikely'];

  private baseUrl = 'http://localhost:8081';
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.surveyForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      telephoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateOfSurvey: ['', Validators.required],
      campusLikes: this.fb.group({
        students: [false],
        location: [false],
        campus: [false],
        atmosphere: [false],
        dormRooms: [false],
        sports: [false]
      }),
      interestedIn: ['', Validators.required],
      recommendation: ['', Validators.required],
      comments: ['']
    });

    // Check for 'id' parameter to load existing survey
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.surveyId = Number(idParam);
      this.loadSurvey(this.surveyId);
    }
  }

  loadSurvey(id: number) {
    console.log(this.surveyForm);
    this.http.get(`${this.baseUrl}/api/surveys/${id}`).subscribe(
      (data: any) => {
        // Populate the form with existing survey data
        this.surveyForm.patchValue({
          firstName: data.firstName,
          lastName: data.lastName,
          streetAddress: data.address.streetAddress,
          city: data.address.city,
          state: data.address.state,
          zip: data.address.zip,
          telephoneNumber: data.telephoneNumber,
          email: data.email,
          dateOfSurvey: data.dateOfSurvey,
          interestedIn: data.interestSource,   // Updated field name
          recommendation: data.likelihood,     // Updated field name
          comments: data.comments
        });

        // Set checkboxes for campus likes
        const campusLikesGroup = this.surveyForm.get('campusLikes') as FormGroup;
        const likedMost = data.likedMost || [];  // Updated field name
        this.campusLikesOptions.forEach(option => {
          campusLikesGroup.get(option.name)?.setValue(likedMost.includes(option.label));
        });
      },
      error => {
        console.error('Error loading survey', error);
        alert('An error occurred while loading the survey.');
      }
    );
  }

  onSubmit() {
    if (this.surveyForm.valid) {
      const surveyData = this.prepareSurveyData();
      if (this.surveyId) {
        // Update existing survey
        this.http.put(`${this.baseUrl}/api/surveys/${this.surveyId}`, surveyData).subscribe(
          response => {
            console.log('Survey updated successfully', response);
            alert('Survey updated successfully!');
            this.router.navigate(['/list-surveys']);
          },
          error => {
            console.error('Error updating survey', error);
            alert('An error occurred while updating your survey. Please try again.');
          }
        );
      } else {
        // Create new survey
        this.http.post(`${this.baseUrl}/api/surveys`, surveyData).subscribe(
          response => {
            console.log('Survey submitted successfully', response);
            alert('Thank you for your feedback!');
            this.router.navigate(['/']);
          },
          error => {
            console.error('Error submitting survey', error);
            alert('An error occurred while submitting your survey. Please try again.');
          }
        );
      }
    } else {
      this.surveyForm.markAllAsTouched();
    }
  }
  

  onCancel() {
    this.surveyForm.reset();
    this.router.navigate(['/']);
  }

  private prepareSurveyData() {
    const formValue = this.surveyForm.value;
    const likedMost = this.campusLikesOptions
      .filter(option => formValue.campusLikes[option.name])
      .map(option => option.label);

    return {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      address: {
        streetAddress: formValue.streetAddress,
        city: formValue.city,
        state: formValue.state,
        zip: formValue.zip
      },
      telephoneNumber: formValue.telephoneNumber,
      email: formValue.email,
      dateOfSurvey: formValue.dateOfSurvey,
      likedMost: likedMost,                   // Updated field name
      interestSource: formValue.interestedIn, // Updated field name
      likelihood: formValue.recommendation,   // Updated field name
      comments: formValue.comments
    };
  }
}
