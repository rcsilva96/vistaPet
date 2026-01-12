package br.com.techvista.vistapet.app.service.impl;

import br.com.techvista.vistapet.app.dto.MedicamentoDTO;
import br.com.techvista.vistapet.app.mapper.MedicamentoMapper;
import br.com.techvista.vistapet.app.service.MedicamentoService;
import br.com.techvista.vistapet.domain.repository.MedicamentoRepository;
import br.com.techvista.vistapet.infra.entity.MedicamentoEntity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class MedicamentoServiceImpl implements MedicamentoService {

    private final MedicamentoRepository medicamentoRepository;

    @Override
    public MedicamentoDTO createMedicamento(MedicamentoDTO dto) {

        MedicamentoEntity entity = MedicamentoMapper.toEntity(dto);

        MedicamentoEntity saved = medicamentoRepository.save(entity);

        log.info("Medicamento registrado com sucesso: {}", saved.getNomeComercial());
        return MedicamentoMapper.toDTO(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public MedicamentoDTO getMedicamentoById(Long id) {

        return medicamentoRepository.findById(id)
                .map(MedicamentoMapper::toDTO)
                .orElseThrow(() -> new IllegalArgumentException("Medicamento não encontrado"));
    }

    @Override
    @Transactional(readOnly = true)
    public List<MedicamentoDTO> getAllMedicamentos() {

        return medicamentoRepository.findAll()
                .stream()
                .map(MedicamentoMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public MedicamentoDTO updateMedicamento(Long id, MedicamentoDTO dto) {

        MedicamentoEntity existing = medicamentoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Medicamento não encontrado"));

        existing.setNomeComercial(dto.getNomeComercial());
        existing.setPrincipioAtivo(dto.getPrincipioAtivo());
        existing.setDosagem(dto.getDosagem());
        existing.setFormaFarmaceutica(dto.getFormaFarmaceutica());

        existing.setQuantidadeEstoque(dto.getQuantidadeEstoque());
        existing.setEstoqueMinimo(dto.getEstoqueMinimo());

        existing.setPrecoUnitario(dto.getPrecoUnitario());
        existing.setControlado(dto.getControlado());

        MedicamentoEntity updated = medicamentoRepository.save(existing);

        log.info("Medicamento atualizado: {}", updated.getNomeComercial());
        return MedicamentoMapper.toDTO(updated);
    }


    /**
     * Delete físico.
     * Medicamento não é entidade histórica.
     */
    @Override
    public MedicamentoDTO deleteMedicamento(Long id) {

        MedicamentoEntity medicamento = medicamentoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Medicamento não encontrado"));

        medicamentoRepository.delete(medicamento);

        log.info("Medicamento {} removido do sistema", id);
        return MedicamentoMapper.toDTO(medicamento);
    }
}
