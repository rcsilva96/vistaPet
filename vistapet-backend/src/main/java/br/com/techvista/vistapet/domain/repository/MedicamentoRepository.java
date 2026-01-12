package br.com.techvista.vistapet.domain.repository;

import br.com.techvista.vistapet.infra.entity.MedicamentoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicamentoRepository extends JpaRepository<MedicamentoEntity, Long> {
}
