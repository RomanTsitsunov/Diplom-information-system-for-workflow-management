package com.example.server.controllers;

import com.example.server.models.Mark;
import com.example.server.services.MarkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/mark")
public class MarkController {
    private final MarkService markService;

    @Autowired
    public MarkController(MarkService markService) {
        this.markService = markService;
    }

    @GetMapping()
    public List<Mark> marks() {
        return markService.getAll();
    }

    @PostMapping("/add")
    public Mark add(@RequestBody Mark mark) {
        try {
            markService.save(mark);
            return mark;
        }
        catch (Exception e) {
            return null;
        }
    }

    @PostMapping("/update/{idMark}")
    public Mark update(@PathVariable("idMark") int idMark, @RequestBody Mark mark) {
        try {
            markService.update(idMark, mark);
            return mark;
        }
        catch (Exception e) {
            return null;
        }
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") int id) {
        markService.deleteById(id);
    }
}
