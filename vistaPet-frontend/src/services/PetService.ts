import type { Pet } from "./types";

const BASE_URL = "http://localhost:8080/api/pets";

export const getPets = async (): Promise<Pet[]> => {

    const response = await fetch(BASE_URL);

    return response.json();

};

export const disablePet = async (id: number): Promise<void> => {

    await fetch(`${BASE_URL}/${id}/disable`, {

        method: 'PUT'

    });

};

export const savePet = async (pet: Pet): Promise<Pet> => {

    const response = await fetch(BASE_URL, {

        method: 'POST',
        headers: {

            'Content-Type': 'application/json'

        },
        body: JSON.stringify(pet)

    });

    return response.json();

}

export const getPet = async (id: string): Promise<Pet> => {

    const response = await fetch(`${BASE_URL}/${id}`);
    return response.json();

};

export const editPet = async (id: number, pet: Pet): Promise<Pet> => {

    const response = await fetch(`${BASE_URL}/${id}`, {

        method: 'PUT',
        headers: {'Content-Type': 'application/json'
        },
        body: JSON.stringify(pet),

    });

    return response.json();

};