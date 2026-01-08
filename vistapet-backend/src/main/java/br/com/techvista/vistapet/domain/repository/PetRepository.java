package br.com.techvista.vistapet.domain.repository;

import br.com.techvista.vistapet.app.enums.PetStatusEnum;
import br.com.techvista.vistapet.infra.entity.PetEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PetRepository extends JpaRepository<PetEntity, Long> {

    public boolean existsById(Long id);
    public List<PetEntity> findByStatus(PetStatusEnum status);

}
