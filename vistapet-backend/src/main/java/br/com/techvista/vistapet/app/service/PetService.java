package br.com.techvista.vistapet.app.service;

import br.com.techvista.vistapet.app.dto.PetDTO;

import java.util.List;

public interface PetService {

    PetDTO createPet(PetDTO petDTO);
    PetDTO getPetById(Long id);
    List<PetDTO> getAllPets();
    PetDTO updatePet(Long id, PetDTO petDTO);
    PetDTO disablePet(Long id);


}
