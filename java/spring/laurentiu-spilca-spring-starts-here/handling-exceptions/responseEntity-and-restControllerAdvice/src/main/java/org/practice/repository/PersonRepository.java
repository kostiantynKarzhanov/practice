package org.practice.repository;

import org.practice.model.Person;

import java.util.List;
import java.util.Optional;

public interface PersonRepository {
    List<Person> findAllPeople();

    Optional<Person> findPersonById(int id);
}
