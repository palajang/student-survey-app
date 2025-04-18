package com.example.surveybackend.service;

import com.example.surveybackend.entity.Survey;
import com.example.surveybackend.repository.SurveyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SurveyService {

    @Autowired
    private SurveyRepository surveyRepository;

    // Create a new survey
    public Survey saveSurvey(Survey survey) {
        return surveyRepository.save(survey);
    }

    // Retrieve all surveys
    public List<Survey> getAllSurveys() {
        return surveyRepository.findAll();
    }

    // Retrieve a survey by ID
    public Optional<Survey> getSurveyById(Long id) {
        return surveyRepository.findById(id);
    }

    // Update a survey
    public Survey updateSurvey(Survey survey) {
        return surveyRepository.save(survey);
    }

    // Delete a survey
    public void deleteSurvey(Long id) {
        surveyRepository.deleteById(id);
    }
}
