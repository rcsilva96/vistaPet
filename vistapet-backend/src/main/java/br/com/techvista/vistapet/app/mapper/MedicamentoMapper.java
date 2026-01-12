package br.com.techvista.vistapet.app.mapper;

import br.com.techvista.vistapet.app.dto.MedicamentoDTO;
import br.com.techvista.vistapet.infra.entity.MedicamentoEntity;

public class MedicamentoMapper {

    public static MedicamentoEntity toEntity(MedicamentoDTO dto) {
        if (dto == null) return null;

        return MedicamentoEntity.builder()
                .id(dto.getId())
                .nomeComercial(dto.getNomeComercial())
                .principioAtivo(dto.getPrincipioAtivo())
                .dosagem(dto.getDosagem())
                .formaFarmaceutica(dto.getFormaFarmaceutica())
                .quantidadeEstoque(dto.getQuantidadeEstoque())
                .estoqueMinimo(dto.getEstoqueMinimo())
                .precoUnitario(dto.getPrecoUnitario())
                .controlado(dto.getControlado())
                .build();
    }

    public static MedicamentoDTO toDTO(MedicamentoEntity entity) {
        if (entity == null) return null;

        MedicamentoDTO dto = new MedicamentoDTO();
        dto.setId(entity.getId());
        dto.setNomeComercial(entity.getNomeComercial());
        dto.setPrincipioAtivo(entity.getPrincipioAtivo());
        dto.setDosagem(entity.getDosagem());
        dto.setFormaFarmaceutica(entity.getFormaFarmaceutica());
        dto.setQuantidadeEstoque(entity.getQuantidadeEstoque());
        dto.setEstoqueMinimo(entity.getEstoqueMinimo());
        dto.setPrecoUnitario(entity.getPrecoUnitario());
        dto.setControlado(entity.getControlado());

        return dto;
    }
}
