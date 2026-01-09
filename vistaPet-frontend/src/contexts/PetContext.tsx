import React, { createContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import api from "../services/api";
import type { Pet } from '../services/types';

interface PetContextType {
  pets: Pet[];
  addPet: (pet: Pet) => Promise<void>;
  updatePet: (pet: Pet) => Promise<void>;
  disablePet: (id: number) => Promise<void>;
}

export const PetContext = createContext<PetContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const PetProvider: React.FC<Props> = ({ children }) => {
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    api.get<Pet[]>("/pets").then((response) => setPets(response.data));
  }, []);

  const addPet = async (pet: Pet) => {
    
    const response = await api.post<Pet>("/pets", pet);
    setPets(prev => [...prev, response.data]);

  };

  const updatePet = async (pet: Pet) => {
    
    const response = await api.put<Pet>(`/pets/${pet.id}`, pet);
    setPets(prev => 
      prev.map(a => (a.id === pet.id ? response.data : a))
    )

  };

  const disablePet = async (id: number) => {

    await api.put(`/pets/${id}/disable`);
    setPets(prev => prev.map(a => 
    a.id === id ? { ...a, ativo: false } : a
    
  ));
  };

  return (
    <PetContext.Provider value={{ pets, addPet, updatePet, disablePet }}>
      {children}
    </PetContext.Provider>
  );
};
