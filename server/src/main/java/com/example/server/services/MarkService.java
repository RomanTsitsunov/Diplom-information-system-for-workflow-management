package com.example.server.services;

import com.example.server.models.Mark;
import com.example.server.repozitories.MarkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class MarkService {
    private final MarkRepository markRepository;

    @Autowired
    public MarkService(MarkRepository markRepository) {
        this.markRepository = markRepository;
    }

    public List<Mark> getAll() {
        return markRepository.findAll();
    }

    @Transactional
    public void save(Mark mark) {
        markRepository.save(mark);
    }

    @Transactional
    public void update(int idMark, Mark mark) {
        mark.setIdMark(idMark);
        Mark markUpdate = markRepository.findById(idMark).get();
        mark.setCards(markUpdate.getCards());
        markRepository.save(mark);
    }

    @Transactional
    public void deleteById(int id) {
        markRepository.deleteById(id);
    }
}
