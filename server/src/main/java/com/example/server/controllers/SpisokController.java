package com.example.server.controllers;

import com.example.server.models.Kanban;
import com.example.server.models.Spisok;
import com.example.server.models.User;
import com.example.server.services.SpisokService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/spisok")
public class SpisokController {
    private final SpisokService spisokService;

    @Autowired
    public SpisokController(SpisokService spisokService) {
        this.spisokService = spisokService;
    }

    @PostMapping()
    public Spisok[] spisoks(@RequestBody Kanban kanban) {
        //return spisokService.getByKanban(kanban, PageRequest.of(0, 2)).getContent();
        return spisokService.getByKanban(kanban);
    }

    @PostMapping("/add/{idKanban}")
    public Spisok add(@PathVariable("idKanban") int idKanban, @RequestBody Spisok spisok) {
        try {
            spisokService.save(idKanban, spisok);
            return spisok;
        }
        catch (Exception e) {
            return null;
        }
    }

    @PostMapping("/update/{idSpisok}")
    public Spisok update(@PathVariable("idSpisok") int idSpisok, @RequestBody Spisok spisok) {
        try {
            spisokService.update(idSpisok, spisok);
            return spisok;
        }
        catch (Exception e) {
            return null;
        }
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") int id) {
        spisokService.deleteById(id);
    }
}
