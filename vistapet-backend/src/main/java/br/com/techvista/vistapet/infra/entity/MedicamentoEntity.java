package br.com.techvista.vistapet.infra.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "medicamentos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicamentoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nomeComercial;

    @Column(nullable = false)
    private String principioAtivo;

    private String dosagem; // ex: 500mg

    private String formaFarmaceutica; // comprimido, xarope, injetável

    @Column(nullable = false)
    private Integer quantidadeEstoque;

    private Integer estoqueMinimo;

    @Column(nullable = false)
    private BigDecimal precoUnitario;

    private Boolean controlado;

    /*@Column(nullable = false)
    private Boolean ativo;*/
}
