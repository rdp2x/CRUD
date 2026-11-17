package com.rdp.backend.controller;

import com.rdp.backend.model.Anime;
import com.rdp.backend.service.AnimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/anime")
@CrossOrigin(origins = "http://localhost:3000")
public class AnimeController {

    @Autowired
    AnimeService service;

    @GetMapping("/show")
    public List<Anime> showCharacters() {
        return service.showCharacters();
    }

    @GetMapping("/show/{id}")
    public Optional<Anime> showCharacterById(@PathVariable Integer id) {
        return service.showCharacterById(id);
    }

    @PostMapping("/new")
    public Anime newCharacter(@RequestBody Anime anime) {
        return service.newCharacter(anime);
    }

    @PutMapping("/change/{id}")
    public Optional<Anime> updateCharacter(@PathVariable Integer id, @RequestBody Anime anime) {
        return Optional.ofNullable(service.updateCharacter(id, anime));
    }

    @DeleteMapping("/kill/{id}")
    public String deleteCharacter(@PathVariable Integer id) {
        return service.deleteCharacter(id);
    }

}
