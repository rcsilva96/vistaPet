package br.com.techvista.vistapet.app.dto;

import br.com.techvista.vistapet.app.enums.PetStatusEnum;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PetDTO {

    private Long id;

    @NotBlank(message = "Você deve informar o nome do pet")
    private String nome;

    @NotBlank(message = "Você deve informar a espécie do pet")
    private String especie;

    @NotNull(message = "Você deve informar o peso do pet")
    @Positive
    private double peso;

    private String raca;

    private String cor;

    private String observacao;

    private PetStatusEnum status = PetStatusEnum.ATIVO;

}
