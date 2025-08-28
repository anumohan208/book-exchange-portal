package org.launchcode.book_exchange.Controllers;

import org.launchcode.book_exchange.Models.Book;
import org.launchcode.book_exchange.Repositories.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/books")

public class BookController {

    private final BookRepository bookRepository;
    @Autowired
    public BookController(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }
    @GetMapping
    public List<Book> getAllEvents() {

        return bookRepository.findAll( );
    }
    @PostMapping
    public ResponseEntity<Book> createBook(
            @RequestParam("tittle") String tittle,

            @RequestParam("author") String author,
            @RequestParam("description") String description,
            @RequestParam("conditionStatus") String conditionStatus,
            @RequestParam("available") boolean available,
            @RequestParam("owner") String owner,
            @RequestParam("addedDate")@DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate addedDate,
            @RequestParam("bookImage") MultipartFile bookImage) {

        Book book = new Book();
        book.setTitle(tittle);
        book.setAuthor(author);
        book.setDescription(description);
        book.setConditionStatus(conditionStatus);
        book.setAvailable(available);
        book.setOwner(owner);
        book.setAddedDate(addedDate);


        try {
            book.setEventImage(bookImage.getBytes());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        Book savedEvent = bookRepository.save(book);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEvent);
    }
    @GetMapping("/{id}/image")
    public ResponseEntity<byte[]> getBookImage(@PathVariable Long id) {
        Optional<Book> bookOptional = bookRepository.findById(id);
        if (bookOptional.isPresent()) {
            Book book = bookOptional.get();
            byte[] imageBytes = book.getEventImage();
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(imageBytes);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
