package org.practice.repository;

import org.practice.model.Person;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class PersonRepositoryList implements PersonRepository {
    private final List<Person> personList;

    public PersonRepositoryList() {
        this.personList = new ArrayList<>();
    }

    @PostConstruct
    public void fillPersonList() {
        Person person_1 = new Person(1, "test-1", LocalDate.of(2000, Month.JANUARY, 1), "programmer");
        Person person_2 = new Person(2, "test-2", LocalDate.of(2000, Month.JANUARY, 2), "astronaut");
        Person person_3 = new Person(3, "test-3", LocalDate.of(2000, Month.JANUARY, 3), "nurse");

        this.personList.addAll(List.of(person_1, person_2, person_3));
    }

    @Override
    public List<Person> findAllPeople() {
        return this.personList;
    }

    @Override
    public Optional<Person> findPersonById(int id) {
        return this.personList
                .stream()
                .filter(person -> person.id() == id)
                .findFirst();
    }
}
