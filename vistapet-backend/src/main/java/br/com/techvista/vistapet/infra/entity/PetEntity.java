package br.com.techvista.vistapet.infra.entity;

import br.com.techvista.vistapet.app.enums.PetStatusEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "pets")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PetEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String especie;
    private double peso;
    private String raca;
    private String cor;
    private String observacao;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PetStatusEnum status;

}
