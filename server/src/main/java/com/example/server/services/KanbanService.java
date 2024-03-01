package com.example.server.services;

import com.example.server.dto.KanbanDTO;
import com.example.server.models.Kanban;
import com.example.server.repozitories.KanbanRepository;
import com.example.server.repozitories.WorkspaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class KanbanService {
    private final KanbanRepository kanbanRepository;
    private final WorkspaceRepository workspaceRepository;

    @Autowired
    public KanbanService(KanbanRepository kanbanRepository, WorkspaceRepository workspaceRepository) {
        this.kanbanRepository = kanbanRepository;
        this.workspaceRepository = workspaceRepository;
    }

    public Kanban getById(int id) {
        return kanbanRepository.findById(id).orElse(null);
    }

    public KanbanDTO getDTOById(int id) {
        return kanbanRepository.findKanbanDTOByIdKanban(id);
    }

    @Transactional
    public void save(int idWorkspace, Kanban kanban) {
        kanban.setWorkspace(workspaceRepository.findById(idWorkspace).get());
        kanbanRepository.save(kanban);
    }

    @Transactional
    public void update(int idKanban, Kanban kanban) {
        kanban.setIdKanban(idKanban);
        Kanban kanbanUpdate = kanbanRepository.findById(idKanban).get();
        kanban.setSpisoks(kanbanUpdate.getSpisoks());
        kanban.setWorkspace(kanbanUpdate.getWorkspace());
        kanbanRepository.save(kanban);
    }

    @Transactional
    public void deleteById(int id) {
        kanbanRepository.deleteById(id);
    }
}
