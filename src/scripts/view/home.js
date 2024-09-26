import NotesApi from "../data/remote/notes-api.js";
import Utils from "../utils.js";
import Modals from "../modals.js";

const home = () => {
  const noteListContainerElement = document.querySelector(
    ".notes-list-container",
  );
  const noteListElement =
    noteListContainerElement.querySelector("#unarchived-notes");
  const noteLoadingElement =
    noteListContainerElement.querySelector("#notes-loading");

  const archivedNoteListContainerElement = document.querySelector(
    ".archived-notes-list-container",
  );
  const archivedNoteListElement =
    archivedNoteListContainerElement.querySelector("#archived-notes");
  const archivedLoadingElement =
    archivedNoteListContainerElement.querySelector("#archived-loading");

  const addNoteElement = document.querySelector("add-note");

  const showNotes = async () => {
    showLoading();
    try {
      const result = await NotesApi.getNotes();
      const notes = result.data;
      console.log(notes);
      displayResult(notes);
      showNotesList();
    } catch (error) {
      Modals.showErrorModal(error.message);
    } finally {
      Utils.hideElement(noteLoadingElement);
    }
  };

  const showArchivedNotes = async () => {
    showLoadingArchived();
    try {
      const result = await NotesApi.getArchivedNotes();
      const notes = result.data;
      console.log(notes);
      displayArchivedResult(notes);
      showArchivedNotesList();
    } catch (error) {
      Modals.showErrorModal(error.message);
    } finally {
      Utils.hideElement(archivedLoadingElement);
    }
  };

  const displayResult = (notes) => {
    const noteItemElements = notes.map((note) => {
      const noteItemElement = document.createElement("note-item");
      noteItemElement.note = note;
      return noteItemElement;
    });

    Utils.emptyElement(noteListElement);
    noteListElement.append(...noteItemElements);
  };

  const displayArchivedResult = (notes) => {
    const noteItemElements = notes.map((note) => {
      const noteItemElement = document.createElement("note-item");
      noteItemElement.note = note;
      return noteItemElement;
    });

    Utils.emptyElement(archivedNoteListElement);
    archivedNoteListElement.append(...noteItemElements);
  };

  const onAddNoteHandler = async (event) => {
    Modals.showLoadingModal();
    const { title, description } = event.detail;
    event.preventDefault();
    try {
      const result = await NotesApi.createNote(title, description);
      Modals.showSuccessModal(result.status, result.message);
      showNotes();
      showArchivedNotes();
    } catch (error) {
      Modals.showErrorModal(error.message);
    }
  };

  const onArchiveNoteHandler = async (event) => {
    Modals.showLoadingModal();
    const { noteId } = event.detail;
    try {
      const result = await NotesApi.archiveNote(noteId);
      Modals.showSuccessModal(result.status, result.message);
      showNotes();
      showArchivedNotes();
    } catch (error) {
      Modals.showErrorModal(error.message);
    }
  };

  const onUnarchiveNoteHandler = async (event) => {
    Modals.showLoadingModal();
    const { noteId } = event.detail;
    try {
      const result = await NotesApi.unarchiveNote(noteId);
      Modals.showSuccessModal(result.status, result.message);
      showNotes();
      showArchivedNotes();
    } catch (error) {
      Modals.showErrorModal(error.message);
    }
  };

  const onDeleteNoteHandler = async (event) => {
    Modals.showLoadingModal();
    const { noteId } = event.detail;
    try {
      const result = await NotesApi.deleteNote(noteId);
      Modals.showSuccessModal(result.status, result.message);
      showNotes();
      showArchivedNotes();
    } catch (error) {
      Modals.showErrorModal(error.message);
    }
  };

  const showNotesList = () => {
    Array.from(noteListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
    Utils.showElement(noteListElement);
  };

  const showArchivedNotesList = () => {
    Array.from(archivedNoteListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
    Utils.showElement(archivedNoteListElement);
  };

  const showLoading = () => {
    Array.from(noteListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
    Utils.showElementFlex(noteLoadingElement);
  };

  const showLoadingArchived = () => {
    Array.from(archivedNoteListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
    Utils.showElementFlex(archivedLoadingElement);
  };

  addNoteElement.addEventListener("noteapp:addnote", onAddNoteHandler);

  noteListElement.addEventListener("noteapp:archive", onArchiveNoteHandler);
  noteListElement.addEventListener("noteapp:delete", onDeleteNoteHandler);

  archivedNoteListElement.addEventListener(
    "noteapp:archive",
    onUnarchiveNoteHandler,
  );
  archivedNoteListElement.addEventListener(
    "noteapp:delete",
    onDeleteNoteHandler,
  );

  showNotes();
  showArchivedNotes();
};

export default home;
