package com.example.server.repozitories;

import com.example.server.dto.KanbanDTO;
import com.example.server.models.Kanban;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KanbanRepository extends JpaRepository<Kanban, Integer> {
    KanbanDTO findKanbanDTOByIdKanban(int id);
}
