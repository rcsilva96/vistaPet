import type { Tutor } from "./types";

const BASE_URL = "http://localhost:8080/api/tutores";

export const getTutors = async (): Promise<Tutor[]> => {

    const response = await fetch(BASE_URL);

    return response.json();

};

export const disableTutor = async (id: number): Promise<void> => {

    await fetch(`${BASE_URL}/${id}/disable`, {

        method: 'PUT'

    });

};

export const saveTutor = async (tutor: Tutor): Promise<Tutor> => {

    const response = await fetch(BASE_URL, {

        method: 'POST',
        headers: {

            'Content-Type': 'application/json'

        },
        body: JSON.stringify(tutor)

    });

    return response.json();

}

export const getTutor = async (id: string): Promise<Tutor> => {

    const response = await fetch(`${BASE_URL}/${id}`);
    return response.json();

};

export const editTutor = async (id: number, tutor: Tutor): Promise<Tutor> => {

    const response = await fetch(`${BASE_URL}/${id}`, {

        method: 'PUT',
        headers: {'Content-Type': 'application/json'
        },
        body: JSON.stringify(tutor),

    });

    return response.json();

};