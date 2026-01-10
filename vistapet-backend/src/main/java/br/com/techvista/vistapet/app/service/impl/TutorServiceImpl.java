package br.com.techvista.vistapet.app.service.impl;

import br.com.techvista.vistapet.app.dto.TutorDTO;
import br.com.techvista.vistapet.app.enums.TutorStatusEnum;
import br.com.techvista.vistapet.app.mapper.EnderecoMapper;
import br.com.techvista.vistapet.app.mapper.TutorMapper;
import br.com.techvista.vistapet.app.service.TutorService;
import br.com.techvista.vistapet.domain.repository.TutorRepository;
import br.com.techvista.vistapet.infra.entity.TutorEntity;
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
public class TutorServiceImpl implements TutorService {

    private final TutorRepository tutorRepository;

    @Override
    public TutorDTO createTutor(TutorDTO dto){

        TutorEntity entity = TutorMapper.toEntity(dto);

        if (dto.getStatus() == null) {
            entity.setStatus(TutorStatusEnum.DESCONHECIDO);
        } else {
            entity.setStatus(dto.getStatus());
        }

        TutorEntity saved = tutorRepository.save(entity);

        log.info("Tutor registado com sucesso: {}", saved.getNome());
        return TutorMapper.toDTO(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public TutorDTO getTutorById(Long id){

        return tutorRepository.findById(id)
                .map(TutorMapper::toDTO)
                .orElseThrow(() -> new IllegalArgumentException("Tutor não encontrado"));

    }

    @Override
    @Transactional(readOnly = true)
    public List<TutorDTO> getAllTutors(){

        return tutorRepository.findByStatus(TutorStatusEnum.ATIVO)
                .stream()
                .map(TutorMapper::toDTO)
                .collect(Collectors.toList());

    }

    //todo: criar métodos getAllDeactivatedTutors, getAllAdoptedTutors, getAllArchivedTutors, getAllUnknownTutors

    @Override
    @Transactional()
    public TutorDTO updateTutor(Long id, TutorDTO dto){

        TutorEntity existing = tutorRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Tutor não encontrado"));

        existing.setNome(dto.getNome());
        existing.setCpf(dto.getCpf());
        existing.setEndereco(
                EnderecoMapper.toEmbeddable(dto.getEndereco())
        );
        existing.setTelefone(dto.getTelefone());
        existing.setEmail(dto.getEmail());
        existing.setObservacoes(dto.getObservacoes());
        existing.setStatus(dto.getStatus());

        TutorEntity updated = tutorRepository.save(existing);
        log.info("Tutor atualizado: {}", updated.getNome());
        return TutorMapper.toDTO(updated);

    }


    @Override
    @Transactional
    public TutorDTO disableTutor(Long id) {

        TutorEntity tutor = tutorRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Tutor não encontrado"));

        if (tutor.getStatus() == TutorStatusEnum.BLOQUEADO) {
            log.warn("Tutor {} já está bloqueado", id);
            return TutorMapper.toDTO(tutor);
        }

        tutor.setStatus(TutorStatusEnum.BLOQUEADO);

        log.info("Tutor {} desativado com sucesso", id);
        return TutorMapper.toDTO(tutor);
    }


}
