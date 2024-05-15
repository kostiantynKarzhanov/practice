package org.practice.model;

import java.time.LocalDate;

public record Person(int id, String name, LocalDate dateOfBirth, String jobTitle) {
}
