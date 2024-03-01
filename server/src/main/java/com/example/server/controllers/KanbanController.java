package com.example.server.controllers;

import com.example.server.dto.KanbanDTO;
import com.example.server.models.Kanban;
import com.example.server.models.User;
import com.example.server.models.Workspace;
import com.example.server.services.KanbanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/kanban")
public class KanbanController {
    private final KanbanService kanbanService;

    @Autowired
    public KanbanController(KanbanService kanbanService) {
        this.kanbanService = kanbanService;
    }

    @GetMapping("/{id}")
    public Kanban kanban(@PathVariable("id") int id) {
        return kanbanService.getById(id);
    }

    @GetMapping("/dto/{id}")
    public KanbanDTO kanbanDTO(@PathVariable("id") int id) {
        return kanbanService.getDTOById(id);
    }

    @PostMapping("/add/{idWorkspace}")
    public Kanban add(@PathVariable("idWorkspace") int idWorkspace, @RequestBody Kanban kanban) {
        try {
            kanbanService.save(idWorkspace, kanban);
            return kanban;
        }
        catch (Exception e) {
            return null;
        }
    }

    @PostMapping("/update/{idKanban}")
    public Kanban update(@PathVariable("idKanban") int idKanban, @RequestBody Kanban kanban) {
        try {
            kanbanService.update(idKanban, kanban);
            return kanban;
        }
        catch (Exception e) {
            return null;
        }
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") int id) {
        kanbanService.deleteById(id);
    }
}
