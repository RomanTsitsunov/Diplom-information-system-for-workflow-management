package com.example.server.controllers;

import com.example.server.models.Card;
import com.example.server.models.Spisok;
import com.example.server.services.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/card")
public class CardController {
    private final CardService cardService;

    @Autowired
    public CardController(CardService cardService) {
        this.cardService = cardService;
    }

    @PostMapping("/add/{idSpisok}")
    public Card add(@PathVariable("idSpisok") int idSpisok, @RequestBody Card card) {
        try {
            cardService.save(idSpisok, card);
            return card;
        }
        catch (Exception e) {
            return null;
        }
    }

    @PostMapping("/update/{idCard}")
    public Card update(@PathVariable("idCard") int idCard, @RequestBody Card card) {
        try {
            cardService.update(idCard, card);
            return card;
        }
        catch (Exception e) {
            return null;
        }
    }

    @PostMapping("/updateSpisok/{idCard}/{idSpisok}")
    public Card update(@PathVariable("idCard") int idCard,
                       @PathVariable("idSpisok") int idSpisok, @RequestBody Card card) {
        try {
            cardService.updateSpisok(idCard, idSpisok, card);
            return card;
        }
        catch (Exception e) {
            return null;
        }
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") int id) {
        cardService.deleteById(id);
    }
}
