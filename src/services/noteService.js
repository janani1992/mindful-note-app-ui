const API_ENDPONT = 'https://localhost:8080/api';


export const noteService = {

    async getAllNotes(sortPriority = false) {
        const url = sortPriority ? `${API_ENDPONT}?sortByPriority=true`: API_ENDPONT;
        const response = await fetch(url);
        if(!response.ok) throw new Error('Failed to load the notes');
        return response.json();
    },

    async getNoteById(id) {
        const response = await fetch(`${API_ENDPONT}/notes/${id}`);
        if(!response.ok) throw new Error('Failed to load a note');
        return response.json();
    },

    async createNote(noteInfo) {
        const response = await fetch(`${API_ENDPONT}/createNote`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(noteInfo)
        });
        if(!response.ok) throw new Error('Failed to create a note');
        return response.json();
    },

    async updateNote(noteInfo, id) {
        const response = await fetch(`${API_ENDPONT}/updateNote/${id}`, {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(noteInfo)
        });
        if(!response.ok) throw new Error('Faile to update a note');
        return response.json();
    },

    async deleteNote(id) {
        const response = await fetch(`${API_ENDPONT}/deleteNote/${id}`, {
            method:'DELETE'
        });
        if(!response.ok) throw new Error('Failed to delete a note');
    },

    async getNotesByPriority(priority) {
        const response = await fetch(`${API_ENDPONT}/notes/${priority}`);
        if(!response.ok) throw new Error('Failed to load notes by priority');
        return response.json()
    }
};
