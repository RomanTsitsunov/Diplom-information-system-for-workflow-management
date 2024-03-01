package com.example.server.controllers;

import com.example.server.models.Workspace;
import com.example.server.services.WorkspaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/workspace")
public class WorkspaceController {
    private final WorkspaceService workspaceService;

    @Autowired
    public WorkspaceController(WorkspaceService workspaceService) {
        this.workspaceService = workspaceService;
    }

    @GetMapping()
    public List<Workspace> workspaces() {
        return workspaceService.getAll();
    }

    @GetMapping("/{idUser}")
    public List<Workspace> workspacesByUser(@PathVariable("idUser") int idUser) {
        return workspaceService.getByUser(idUser);
    }

    @PostMapping("/add/{idUser}")
    public Workspace add(@PathVariable("idUser") int idUser, @RequestBody Workspace workspace) {
        try {
            workspaceService.save(idUser, workspace);
            return workspace;
        }
        catch (Exception e) {
            return null;
        }
    }

    @PostMapping("/update/{idWorkspace}")
    public Workspace update(@PathVariable("idWorkspace") int idWorkspace, @RequestBody Workspace workspace) {
        try {
            workspaceService.update(idWorkspace, workspace);
            return workspace;
        }
        catch (Exception e) {
            return null;
        }
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") int id) {
        workspaceService.deleteById(id);
    }
}
