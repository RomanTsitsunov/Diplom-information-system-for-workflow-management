package com.example.server.services;

import com.example.server.models.User;
import com.example.server.models.Workspace;
import com.example.server.repozitories.UserRepository;
import com.example.server.repozitories.WorkspaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class WorkspaceService {
    private final WorkspaceRepository workspaceRepository;
    private final UserRepository userRepository;

    @Autowired
    public WorkspaceService(WorkspaceRepository workspaceRepository, UserRepository userRepository) {
        this.workspaceRepository = workspaceRepository;
        this.userRepository = userRepository;
    }

    public List<Workspace> getAll() {
        return workspaceRepository.findAll();
    }

    public List<Workspace> getByUser(int idUser) {
        User user = userRepository.findById(idUser).get();
        return user.getWorkspaces();
    }

    @Transactional
    public void save(int idUser, Workspace workspace) {
        workspace.setUsers(userRepository.findById(idUser).stream().toList());
        workspaceRepository.save(workspace);
    }

    @Transactional
    public void update(int idWorkspace, Workspace workspace) {
        workspace.setIdWorkspace(idWorkspace);
        workspace.setUsers(workspaceRepository.findById(idWorkspace).get().getUsers());
        workspaceRepository.save(workspace);
    }

    @Transactional
    public void deleteById(Integer id) {
        //workspaceRepository.deleteAllUser_workspaceById_workspace(id);
        workspaceRepository.deleteById(id);
    }
}
