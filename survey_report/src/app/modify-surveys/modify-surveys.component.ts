  // src/app/modify-page/modify-page.component.ts

  import { Component, OnInit } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { HttpClient, HttpClientModule } from '@angular/common/http';
  import { RouterModule, Router } from '@angular/router';
  
  @Component({
    selector: 'app-modify-surveys',
    templateUrl: './modify-surveys.component.html',
    styleUrls: ['./modify-surveys.component.css'],
    standalone: true,
    imports: [CommonModule, HttpClientModule, RouterModule],
  })
  export class ModifySurveysComponent implements OnInit {
    surveys: any[] = [];
    loading: boolean = false;
    error: string = '';

    constructor(private http: HttpClient, private router: Router) {}

    ngOnInit() {
      this.fetchSurveys();
    }

    fetchSurveys() {
      this.loading = true;
      this.http.get<any[]>('http://localhost:8081/api/surveys').subscribe(
        data => {
          this.surveys = data;
          this.loading = false;
        },
        error => {
          console.error('Error fetching surveys', error);
          this.error = 'An error occurred while fetching surveys.';
          this.loading = false;
        }
      );
    }

    deleteSurvey(id: number) {
      if (confirm('Are you sure you want to delete this survey?')) {
        this.http.delete(`http://localhost:8081/api/surveys/${id}`).subscribe(
          () => {
            this.surveys = this.surveys.filter(survey => survey.id !== id);
            alert('Survey deleted successfully.');
          },
          error => {
            console.error('Error deleting survey', error);
            alert('An error occurred while deleting the survey. Please try again.');
          }
        );
      }
    }
    

    updateSurvey(id: number) {
      // Navigate to the survey page with the survey ID for editing
      this.router.navigate(['/survey', id]);
    }
  }
