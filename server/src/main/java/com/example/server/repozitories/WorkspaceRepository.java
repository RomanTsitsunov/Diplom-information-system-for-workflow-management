package com.example.server.repozitories;

import com.example.server.models.Kanban;
import com.example.server.models.User;
import com.example.server.models.Workspace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkspaceRepository extends JpaRepository<Workspace, Integer> {
    //@Query("DELETE FROM Workspace w WHERE w.id_workspace = :id")
    //void deleteAllUser_workspaceById_workspace(@Param("id") int id);
}
