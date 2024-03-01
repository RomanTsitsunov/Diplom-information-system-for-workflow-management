package com.example.server.services;

import com.example.server.models.Kanban;
import com.example.server.models.Spisok;
import com.example.server.repozitories.KanbanRepository;
import com.example.server.repozitories.SpisokRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class SpisokService {
    private final SpisokRepository spisokRepository;
    private final KanbanRepository kanbanRepository;

    @Autowired
    public SpisokService(SpisokRepository spisokRepository, KanbanRepository kanbanRepository) {
        this.spisokRepository = spisokRepository;
        this.kanbanRepository = kanbanRepository;
    }

    public Page<Spisok> getPageByKanban(Kanban kanban, Pageable pageable) {
        return spisokRepository.findPageByKanban(kanban, pageable);
    }

    public Spisok[] getByKanban(Kanban kanban) {
        return spisokRepository.findByKanban(kanban);
    }

    @Transactional
    public void save(int idKanban, Spisok spisok) {
        spisok.setKanban(kanbanRepository.findById(idKanban).get());
        spisokRepository.save(spisok);
    }

    @Transactional
    public void update(int idSpisok, Spisok spisok) {
        spisok.setIdSpisok(idSpisok);
        Spisok spisokUpdate = spisokRepository.findById(idSpisok).get();
        spisok.setCards(spisokUpdate.getCards());
        spisok.setKanban(spisokUpdate.getKanban());
        spisokRepository.save(spisok);
    }

    @Transactional
    public void deleteById(int id) {
        spisokRepository.deleteById(id);
    }
}
