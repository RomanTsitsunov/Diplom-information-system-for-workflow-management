package com.example.server.services;

import com.example.server.models.Card;
import com.example.server.models.Comment;
import com.example.server.models.User;
import com.example.server.repozitories.CardRepository;
import com.example.server.repozitories.CommentRepository;
import com.example.server.repozitories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
@Transactional(readOnly = true)
public class CommentService {
    private final CommentRepository commentRepository;
    private final CardRepository cardRepository;
    private final UserRepository userRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository, CardRepository cardRepository, UserRepository userRepository) {
        this.commentRepository = commentRepository;
        this.cardRepository = cardRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public void save(int idCard, int idUser, Comment comment) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        comment.setDate(Timestamp.valueOf(format.format(new Date())));
        Card card = cardRepository.findById(idCard).get();
        User user = userRepository.findById(idUser).get();
        comment.setCard(card);
        comment.setUser(user);
        commentRepository.save(comment);
    }

    @Transactional
    public void update(int idComment, Comment comment) {
        comment.setIdComment(idComment);
        Comment commentUpdate = commentRepository.findById(idComment).get();
        comment.setDate(commentUpdate.getDate());
        comment.setCard(commentUpdate.getCard());
        comment.setUser(commentUpdate.getUser());
        commentRepository.save(comment);
    }

    @Transactional
    public void deleteById(int idComment) {
        commentRepository.deleteById(idComment);
    }
}
