package br.com.techvista.vistapet.app.mapper;

import br.com.techvista.vistapet.app.dto.TutorDTO;
import br.com.techvista.vistapet.infra.entity.TutorEntity;

public class TutorMapper {

    public static TutorDTO toDTO(TutorEntity entity){

        if (entity == null) return null;

        return new TutorDTO(
                entity.getId(),
                entity.getNome(),
                entity.getCpf(),
                EnderecoMapper.toDTO(entity.getEndereco()),
                entity.getTelefone(),
                entity.getEmail(),
                entity.getObservacoes(),
                entity.getStatus()
        );

    }

    public static TutorEntity toEntity(TutorDTO dto){

        if (dto == null) return null;

        TutorEntity entity = new TutorEntity();
        entity.setId(dto.getId());
        entity.setNome(dto.getNome());
        entity.setCpf(dto.getCpf());
        entity.setEndereco(EnderecoMapper.toEmbeddable(dto.getEndereco()));
        entity.setTelefone(dto.getTelefone());
        entity.setEmail(dto.getEmail());
        entity.setObservacoes(dto.getObservacoes());
        entity.setStatus(dto.getStatus());

        return entity;

    }

}
