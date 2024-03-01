package com.example.server.controllers;

import com.example.server.models.Comment;
import com.example.server.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/comment")
public class CommentController {
    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping("/add/{idCard}/{idUser}")
    public Comment add(@PathVariable("idCard") int idCard,
                       @PathVariable("idUser") int idUser,
                       @RequestBody Comment comment) {
        commentService.save(idCard, idUser, comment);
        return comment;
    }

    @PostMapping("/update/{idComment}")
    public Comment update(@PathVariable("idComment") int idComment, @RequestBody Comment comment) {
        commentService.update(idComment, comment);
        return comment;
    }

    @DeleteMapping("/{idComment}")
    public void delete(@PathVariable("idComment") int idComment) {
        commentService.deleteById(idComment);
    }
}
