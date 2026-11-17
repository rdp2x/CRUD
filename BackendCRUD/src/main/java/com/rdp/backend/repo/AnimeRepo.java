package com.rdp.backend.repo;

import com.rdp.backend.model.Anime;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnimeRepo extends JpaRepository<Anime, Long> {}
