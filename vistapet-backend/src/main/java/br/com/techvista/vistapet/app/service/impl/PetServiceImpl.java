package br.com.techvista.vistapet.app.service.impl;

import br.com.techvista.vistapet.app.dto.PetDTO;
import br.com.techvista.vistapet.app.enums.PetStatusEnum;
import br.com.techvista.vistapet.app.mapper.PetMapper;
import br.com.techvista.vistapet.app.service.PetService;
import br.com.techvista.vistapet.domain.repository.PetRepository;
import br.com.techvista.vistapet.infra.entity.PetEntity;
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
public class PetServiceImpl implements PetService {

    private final PetRepository petRepository;

    @Override
    public PetDTO createPet(PetDTO dto){

        PetEntity entity = PetMapper.toEntity(dto);

        if (dto.getStatus() == null) {
            entity.setStatus(PetStatusEnum.DESCONHECIDO);
        } else {
            entity.setStatus(dto.getStatus());
        }

        PetEntity saved = petRepository.save(entity);

        log.info("Pet registado com sucesso: {}", saved.getNome());
        return PetMapper.toDTO(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public PetDTO getPetById(Long id){

        return petRepository.findById(id)
                .map(PetMapper::toDTO)
                .orElseThrow(() -> new IllegalArgumentException("Pet não encontrado"));

    }

    @Override
    @Transactional(readOnly = true)
    public List<PetDTO> getAllPets(){

        return petRepository.findByStatus(PetStatusEnum.ATIVO)
                .stream()
                .map(PetMapper::toDTO)
                .collect(Collectors.toList());

    }

    //todo: criar métodos getAllDeactivatedPets, getAllAdoptedPets, getAllArchivedPets, getAllUnknownPets

    @Override
    @Transactional()
    public PetDTO updatePet(Long id, PetDTO dto){

        PetEntity existing = petRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Pet não encontrado"));

        existing.setNome(dto.getNome());
        existing.setEspecie(dto.getEspecie());
        existing.setPeso(dto.getPeso());
        existing.setRaca(dto.getRaca());
        existing.setCor(dto.getCor());
        existing.setObservacao(dto.getObservacao());
        existing.setStatus(dto.getStatus());

        PetEntity updated = petRepository.save(existing);
        log.info("Pet atualizado: {}", updated.getNome());
        return PetMapper.toDTO(updated);

    }


    @Override
    @Transactional
    public PetDTO disablePet(Long id) {

        PetEntity pet = petRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Pet não encontrado"));

        if (pet.getStatus() == PetStatusEnum.INATIVO) {
            log.warn("Pet {} já está desativado", id);
            return PetMapper.toDTO(pet);
        }

        pet.setStatus(PetStatusEnum.INATIVO);

        log.info("Pet {} desativado com sucesso", id);
        return PetMapper.toDTO(pet);
    }


}
