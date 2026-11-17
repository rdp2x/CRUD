package com.rdp.backend.service;

import com.rdp.backend.model.Anime;
import com.rdp.backend.repo.AnimeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnimeService {

    @Autowired
    AnimeRepo repo;

    public List<Anime> showCharacters() {
        return repo.findAll(Sort.by("name"));
    }

    public Optional<Anime> showCharacterById(Integer id) {
        return repo.findById(Long.valueOf(id));
    }

    public Anime newCharacter(Anime anime) {
        return repo.save(anime);
    }

    public Anime updateCharacter(Integer id, Anime anime) {

        if (repo.findById(Long.valueOf(id)).isEmpty())
            return null;

        repo.findById(Long.valueOf(id)).get().setName(anime.getName());
        repo.findById(Long.valueOf(id)).get().setAge(anime.getAge());
        repo.findById(Long.valueOf(id)).get().setPower(anime.getPower());
        repo.findById(Long.valueOf(id)).get().setIntelligence(anime.getIntelligence());
        repo.findById(Long.valueOf(id)).get().setWeakness(anime.getWeakness());
        repo.findById(Long.valueOf(id)).get().setUniverse(anime.getUniverse());

        return repo.save(repo.findById(Long.valueOf(id)).get());
    }

    public String deleteCharacter(Integer id) {
        repo.deleteById(Long.valueOf(id));
        return "You killed the Character";
    }
}
