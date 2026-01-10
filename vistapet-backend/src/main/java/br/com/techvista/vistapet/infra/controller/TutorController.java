package br.com.techvista.vistapet.infra.controller;

import br.com.techvista.vistapet.app.dto.TutorDTO;
import br.com.techvista.vistapet.app.service.TutorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tutores")
@RequiredArgsConstructor
public class TutorController {

    private final TutorService tutorService;

    @PostMapping
    public ResponseEntity<TutorDTO> createTutor(@Valid @RequestBody TutorDTO dto){

        TutorDTO created = tutorService.createTutor(dto);
        return ResponseEntity.status(201).body(created);

    }

    @GetMapping("/{id}")
    public ResponseEntity<TutorDTO> getTutorById(@PathVariable Long id){

        TutorDTO dto = tutorService.getTutorById(id);
        return ResponseEntity.ok(dto);

    }

    @GetMapping
    public ResponseEntity<List<TutorDTO>> getAllTutors(){

        List<TutorDTO> list = tutorService.getAllTutors();
        return ResponseEntity.ok(list);

    }

    @PutMapping("/{id}")
    public ResponseEntity<TutorDTO> updateTutor(@PathVariable Long id, @Valid @RequestBody TutorDTO dto){

        TutorDTO updated = tutorService.updateTutor(id, dto);
        return ResponseEntity.ok(updated);

    }

    @PatchMapping("/{id}/disable")
    public ResponseEntity<TutorDTO> disableTutor(@PathVariable Long id) {
        return ResponseEntity.ok(tutorService.disableTutor(id));
    }


}
