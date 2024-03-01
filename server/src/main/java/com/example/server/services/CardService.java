package com.example.server.services;

import com.example.server.models.Card;
import com.example.server.models.Mark;
import com.example.server.models.Spisok;
import com.example.server.repozitories.CardRepository;
import com.example.server.repozitories.MarkRepository;
import com.example.server.repozitories.SpisokRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class CardService {
    private final CardRepository cardRepository;
    private final SpisokRepository spisokRepository;
    private final MarkRepository markRepository;

    @Autowired
    public CardService(CardRepository cardRepository, SpisokRepository spisokRepository, MarkRepository markRepository) {
        this.cardRepository = cardRepository;
        this.spisokRepository = spisokRepository;
        this.markRepository = markRepository;
    }

    @Transactional
    public void save(int idSpisok, Card card) {
        card.setSpisok(spisokRepository.findById(idSpisok).get());
        cardRepository.save(card);
    }

    @Transactional
    public void update(int idCard, Card card) {
        card.setIdCard(idCard);
        Card cardUpdate = cardRepository.findById(idCard).get();
        if(card.getMarks() == null) {
            card.setMarks(cardUpdate.getMarks());
        }
        if(card.getUsers() == null) {
            card.setUsers(cardUpdate.getUsers());
        }
        card.setSpisok(cardUpdate.getSpisok());
        card.setComments(cardUpdate.getComments());
        cardRepository.save(card);
    }

    @Transactional
    public void updateSpisok(int idCard, int idSpisok, Card card) {
        card.setIdCard(idCard);
        Card cardUpdate = cardRepository.findById(idCard).get();
        Spisok spisokUpdate = spisokRepository.findById(idSpisok).get();
        card.setMarks(cardUpdate.getMarks());
        card.setSpisok(spisokUpdate);
        card.setComments(cardUpdate.getComments());
        card.setUsers(cardUpdate.getUsers());
        cardRepository.save(card);
    }

    @Transactional
    public void deleteById(int id) {
        cardRepository.deleteById(id);
    }
}
