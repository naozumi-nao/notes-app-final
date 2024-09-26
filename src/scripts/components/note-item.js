import Utils from "../utils.js";

class NoteItem extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  _archiveEvent = "noteapp:archive";
  _deleteEvent = "noteapp:delete";

  _note = {
    id: null,
    title: null,
    body: null,
    createdAt: null,
    archived: null,
  };

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  set note(value) {
    this._note = value;

    this.render();
  }

  get note() {
    return this._note;
  }

  connectedCallback() {
    const archiveButton = this._shadowRoot.querySelector("#archive-button");
    const deleteButton = this._shadowRoot.querySelector("#delete-button");
    const noteId = this._note.id;

    if (this._note.archived) {
      archiveButton.innerHTML = `Unarchive Note`;
    }

    // because note-item is a slotted shadowdom, it's best to pass on event handling
    // to its parent by enabling bubbles - Bima Adityo K.
    archiveButton.addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent(this._archiveEvent, {
          bubbles: true,
          detail: { noteId },
        }),
      );
    });

    deleteButton.addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent(this._deleteEvent, {
          bubbles: true,
          detail: { noteId },
        }),
      );
    });
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        display: block;
      }

      .note-item {
        border-radius: 12px;
        background: #BBE9FF;
        padding: 0.75rem 1rem;
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
      }

      h3 {
        border-bottom: 1px solid #050C9C;
        color: #050C9C;
        margin: 0;
        padding: 0.25rem;
        font-size: 1.25rem;
      }

      p {
        margin: 0.75rem 0.2rem;
        font-size: 1.05rem;
      }

      .timestamp {
        color: #050C9C;
        font-size: 0.8rem;
      }

      .note-buttons {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-around;
        gap: 1rem;
        margin-top: 1.5rem;
        margin-bottom: 0.25rem;
      }

      button {
        display: none;
        border-radius: 16px;
        width: 100%;
        padding: 0.5em;
        border: 2px solid #3092e2;
        background: #a6d2f7;
        color: black;
        font-size: 1rem;
        cursor: pointer;
      }

      button:hover {
        background: #3092e2;
        color: white;
      }

      button#delete-button {
        border: 2px solid #C7253E;
        background: #de7988;
        cursor: pointer;
      }
      button#delete-button:hover {
        background: #C7253E;
        color: white;
      }

      .note-item:hover button, .note-item:active button {
        display: block;
      }

    `;
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div id="${this._note.id}" class="note-item">
        <h3>${this._note.title}</h3>
        <p>${this._note.body}</p>
        <p class="timestamp">${Utils.convertDate(this._note.createdAt)}</p>
        <div class="note-buttons">
          <button id="archive-button">Archive Note</button>
          <button id="delete-button">Delete Note</button>
        </div>
      </div>
    `;
  }
}

customElements.define("note-item", NoteItem);
