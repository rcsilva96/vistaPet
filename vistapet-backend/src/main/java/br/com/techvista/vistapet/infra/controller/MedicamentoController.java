package br.com.techvista.vistapet.infra.controller;

import br.com.techvista.vistapet.app.dto.MedicamentoDTO;
import br.com.techvista.vistapet.app.service.MedicamentoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medicamentos")
@RequiredArgsConstructor
public class MedicamentoController {

    private final MedicamentoService medicamentoService;

    @PostMapping
    public ResponseEntity<MedicamentoDTO> createMedicamento(@Valid @RequestBody MedicamentoDTO dto){

        MedicamentoDTO created = medicamentoService.createMedicamento(dto);
        return ResponseEntity.status(201).body(created);

    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicamentoDTO> getMedicamentoById(@PathVariable Long id){

        MedicamentoDTO dto = medicamentoService.getMedicamentoById(id);
        return ResponseEntity.ok(dto);

    }

    @GetMapping
    public ResponseEntity<List<MedicamentoDTO>> getAllMedicamentos(){

        List<MedicamentoDTO> list = medicamentoService.getAllMedicamentos();
        return ResponseEntity.ok(list);

    }

    @PutMapping("/{id}")
    public ResponseEntity<MedicamentoDTO> updateMedicamento(@PathVariable Long id, @Valid @RequestBody MedicamentoDTO dto){

        MedicamentoDTO updated = medicamentoService.updateMedicamento(id, dto);
        return ResponseEntity.ok(updated);

    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteMedicamento(@PathVariable Long id) {
        medicamentoService.deleteMedicamento(id);
    }


}
