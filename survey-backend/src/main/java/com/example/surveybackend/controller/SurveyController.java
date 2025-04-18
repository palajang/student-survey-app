package com.example.surveybackend.controller;

import com.example.surveybackend.entity.Survey;
import com.example.surveybackend.service.SurveyService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/surveys")
@CrossOrigin(origins = "http://localhost:4200")
@Validated
public class SurveyController {

    private final SurveyService surveyService;

    public SurveyController(SurveyService surveyService) {
        this.surveyService = surveyService;
    }

    @PostMapping
    public ResponseEntity<Survey> createSurvey(@Valid @RequestBody Survey survey) {
        Survey savedSurvey = surveyService.saveSurvey(survey);
        return ResponseEntity.ok(savedSurvey);
    }

    @GetMapping
    public ResponseEntity<List<Survey>> getAllSurveys() {
        List<Survey> surveys = surveyService.getAllSurveys();
        return ResponseEntity.ok(surveys);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Survey> getSurveyById(@PathVariable Long id) {
        return surveyService.getSurveyById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Survey> updateSurvey(@PathVariable Long id, @Valid @RequestBody Survey surveyDetails) {
        return surveyService.getSurveyById(id)
                .map(survey -> {
                    survey.setFirstName(surveyDetails.getFirstName());
                    survey.setLastName(surveyDetails.getLastName());
                    survey.setAddress(surveyDetails.getAddress());
                    survey.setTelephoneNumber(surveyDetails.getTelephoneNumber());
                    survey.setEmail(surveyDetails.getEmail());
                    survey.setDateOfSurvey(surveyDetails.getDateOfSurvey());
                    survey.setLikedMost(surveyDetails.getLikedMost());
                    survey.setInterestSource(surveyDetails.getInterestSource());
                    survey.setLikelihood(surveyDetails.getLikelihood());
                    survey.setComments(surveyDetails.getComments());

                    Survey updatedSurvey = surveyService.updateSurvey(survey);
                    return ResponseEntity.ok(updatedSurvey);
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSurvey(@PathVariable Long id) {
        return surveyService.getSurveyById(id)
                .map(survey -> {
                    surveyService.deleteSurvey(id);
                    return ResponseEntity.noContent().build();
                }).orElse(ResponseEntity.notFound().build());
    }
}
