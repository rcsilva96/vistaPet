package br.com.techvista.vistapet.app.service;

import br.com.techvista.vistapet.app.dto.MedicamentoDTO;

import java.util.List;

public interface MedicamentoService {

    MedicamentoDTO createMedicamento(MedicamentoDTO medicamentoDTO);
    MedicamentoDTO getMedicamentoById(Long id);
    List<MedicamentoDTO> getAllMedicamentos();
    MedicamentoDTO updateMedicamento(Long id, MedicamentoDTO medicamentoDTO);
    MedicamentoDTO deleteMedicamento(Long id);

}
