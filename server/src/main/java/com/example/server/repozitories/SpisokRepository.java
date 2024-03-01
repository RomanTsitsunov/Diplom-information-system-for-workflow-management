package com.example.server.repozitories;

import com.example.server.models.Kanban;
import com.example.server.models.Spisok;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface SpisokRepository extends /*PagingAndSortingRepository*/JpaRepository<Spisok, Integer> {
    Page<Spisok> findPageByKanban(Kanban kanban, Pageable pageable);
    Spisok[] findByKanban(Kanban kanban);
}
