package br.com.techvista.vistapet.app.mapper;

import br.com.techvista.vistapet.app.dto.PetDTO;
import br.com.techvista.vistapet.infra.entity.PetEntity;

public class PetMapper {

    public static PetDTO toDTO(PetEntity entity){

        if (entity == null) return null;

        return new PetDTO(
                entity.getId(),
                entity.getNome(),
                entity.getEspecie(),
                entity.getPeso(),
                entity.getRaca(),
                entity.getCor(),
                entity.getObservacao(),
                entity.getStatus()
        );

    }

    public static PetEntity toEntity(PetDTO dto){

        if (dto == null) return null;

        PetEntity entity = new PetEntity();
        entity.setId(dto.getId());
        entity.setNome(dto.getNome());
        entity.setEspecie(dto.getEspecie());
        entity.setPeso(dto.getPeso());
        entity.setRaca(dto.getRaca());
        entity.setCor(dto.getCor());
        entity.setObservacao(dto.getObservacao());
        entity.setStatus(dto.getStatus());

        return entity;

    }

}
