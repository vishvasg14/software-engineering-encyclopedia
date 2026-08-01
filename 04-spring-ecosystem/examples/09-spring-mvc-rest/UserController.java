package com.example.web;

import com.example.service.UserService;
import com.example.entity.User;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.findById(id);
    }

    @GetMapping
    public List<User> listUsers() {
        return userService.findAll();
    }

    @PostMapping
    public ResponseEntity<User> create(@RequestBody @Valid CreateUserRequest req) {
        User created = userService.create(req);
        return ResponseEntity
            .created(URI.create("/api/users/" + created.getId()))
            .body(created);
    }
}

record CreateUserRequest(
    @jakarta.validation.constraints.NotBlank String name,
    @jakarta.validation.constraints.Email String email
) {}