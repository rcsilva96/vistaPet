package br.com.techvista.vistapet.infra.controller;

import br.com.techvista.vistapet.app.dto.PetDTO;
import br.com.techvista.vistapet.app.service.PetService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pets")
@RequiredArgsConstructor
public class PetController {

    private final PetService petService;

    @PostMapping
    public ResponseEntity<PetDTO> createPet(@Valid @RequestBody PetDTO dto){

        PetDTO created = petService.createPet(dto);
        return ResponseEntity.status(201).body(created);

    }

    @GetMapping("/{id}")
    public ResponseEntity<PetDTO> getPetById(@PathVariable Long id){

        PetDTO dto = petService.getPetById(id);
        return ResponseEntity.ok(dto);

    }

    @GetMapping
    public ResponseEntity<List<PetDTO>> getAllPets(){

        List<PetDTO> list = petService.getAllPets();
        return ResponseEntity.ok(list);

    }

    @PutMapping("/{id}")
    public ResponseEntity<PetDTO> updatePet(@PathVariable Long id, @Valid @RequestBody PetDTO dto){

        PetDTO updated = petService.updatePet(id, dto);
        return ResponseEntity.ok(updated);

    }

    @PatchMapping("/{id}/disable")
    public ResponseEntity<PetDTO> disablePet(@PathVariable Long id) {
        return ResponseEntity.ok(petService.disablePet(id));
    }


}
