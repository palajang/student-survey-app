package com.example.surveybackend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "surveys")
@Data // Lombok annotation to generate getters and setters
public class Survey {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Personal Information
    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @Embedded
    private Address address;

    @NotBlank(message = "Telephone number is required")
    private String telephoneNumber;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;

    @NotNull(message = "Date of survey is required")
    @Temporal(TemporalType.DATE)
    private Date dateOfSurvey;

    // Survey Details
    @ElementCollection
    private List<String> likedMost;

    private String interestSource;

    private String likelihood;

    private String comments;

    // Constructors
    public Survey() {}

    // Lombok's @Data annotation generates all getters and setters
}
