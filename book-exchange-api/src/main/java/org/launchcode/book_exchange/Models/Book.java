package org.launchcode.book_exchange.Models;

import jakarta.persistence.*;
import org.springframework.data.annotation.Id;

import java.time.LocalDate;

@Entity
public class Book {
    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String author;

    @Column(length = 1000)
    private String description;

    private String conditionStatus;

    @Lob
    @Column(name = "event_image", columnDefinition = "LONGBLOB")
    private byte[] eventImage;

    @Column(nullable = false)
    private boolean available = true;

    private String owner;

    private LocalDate addedDate = LocalDate.now();

    public Book(String title, String author, String description, String conditionStatus, byte[] eventImage, boolean available, String owner, LocalDate addedDate) {
        this.title = title;
        this.author = author;
        this.description = description;
        this.conditionStatus = conditionStatus;
        this.eventImage = eventImage;
        this.available = available;
        this.owner = owner;
        this.addedDate = addedDate;
    }

    public Book() {

    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getConditionStatus() {
        return conditionStatus;
    }

    public void setConditionStatus(String conditionStatus) {
        this.conditionStatus = conditionStatus;
    }

    public byte[] getEventImage() {
        return eventImage;
    }

    public void setEventImage(byte[] eventImage) {
        this.eventImage = eventImage;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public LocalDate getAddedDate() {
        return addedDate;
    }

    public void setAddedDate(LocalDate addedDate) {
        this.addedDate = addedDate;
    }
}
