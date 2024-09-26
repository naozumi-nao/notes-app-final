const BASE_URL = "https://notes-api.dicoding.dev/v2";

class NotesApi {
  static async getNotes() {
    const response = await fetch(`${BASE_URL}/notes`);
    return await response.json();
  }

  static async getArchivedNotes() {
    const response = await fetch(`${BASE_URL}/notes/archived`);
    return await response.json();
  }

  static async getSingleNote(noteId) {
    const response = await fetch(`${BASE_URL}/notes/${noteId}`);
    return await response.json();
  }

  static async createNote(title, description) {
    const note = {
      title: title,
      body: description,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    };

    const response = await fetch(`${BASE_URL}/notes`, options);
    return await response.json();
  }

  static async archiveNote(noteId) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(
      `${BASE_URL}/notes/${noteId}/archive`,
      options,
    );
    return await response.json();
  }

  static async unarchiveNote(noteId) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(
      `${BASE_URL}/notes/${noteId}/unarchive`,
      options,
    );
    return await response.json();
  }

  static async deleteNote(noteId) {
    const options = {
      method: "DELETE",
    };

    const response = await fetch(`${BASE_URL}/notes/${noteId}`, options);
    return await response.json();
  }
}

export default NotesApi;
