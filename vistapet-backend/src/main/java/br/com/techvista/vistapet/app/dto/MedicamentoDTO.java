package br.com.techvista.vistapet.app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MedicamentoDTO {

    private Long id;

    private String nomeComercial;
    private String principioAtivo;
    private String dosagem;
    private String formaFarmaceutica;

    private Integer quantidadeEstoque;
    private Integer estoqueMinimo;

    private BigDecimal precoUnitario;

    private Boolean controlado;
}
