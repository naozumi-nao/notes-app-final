import addSvg from "./assets/add.svg";
import cancelSvg from "./assets/cancel.svg";

class AddNote extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  _submitEvent = "noteapp:submit";
  _addNoteEvent = "noteapp:addnote";

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");

    this.render();
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        display: flex;
        justify-content: center;
      }

      button {
        padding: 1em;
        font-size: 1.1rem;
        cursor: pointer;
        border: none;
        background: #3092e2;
        color: white;
        border-radius: 8px;
      }

      button[type=submit] {
        border-radius: 16px;
        padding: 0.75em;
        border: 2px solid #3092e2;
        background: #a6d2f7;
        color: black;
        font-size: 1.1rem;
        cursor: pointer;
      }

      button[type=submit]:hover {
        background: #3092e2;
        color: white;
      }

      #add-note {
        position: fixed;
        width: 75px;
        height: 75px;
        bottom: 5%;
        right: 5%;
        background: url(${addSvg});
        background-color: #3092e2;
        background-size: 100% 100%;
        border-radius: 50px;
        text-align: center;
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
      }

      #add-note:hover {
        transform: scale(1.1);
        cursor: pointer;
      }

      dialog {
        margin: auto;
        padding: 0;
        height: fit-content;
        width: clamp(300px, 50%, 600px);
        border: 1px solid #3092e2;
        border-radius: 16px;
      }

      .clickable-area {
        padding: 1.5rem;
      }

      dialog::backdrop {
        background-color: gray;
        opacity: 0.5;
      }

      dialog[open] {
        animation: slideUp 0.35s ease-in-out;
      }
        
      @keyframes slideUp{
        0% {
          transform: translateY(600px);
        }
        100% {
          transform: translateY(0);
        }
      }

      dialog #close-dialog {
        width: 28px;
        height: 28px;
        display: block;
        margin-left: auto;
        margin-top: 0;
        background: url(${cancelSvg});
        background-size: 100% 100%;
      }

      dialog form {
        margin-top: 1rem;
        display: flex;
        flex-flow: column nowrap;
        gap: 0.25rem;
      }

      input[type="text"] {
        padding: 8px;
        font-size: 16px;
      }

      textarea {
        font-size: 1rem;
        height: 5em;
        padding: 8px;
        resize: vertical;
      }

      dialog button {
        margin-top: 1rem;
      }

      input:user-invalid, textarea:user-invalid {
        border: 1px solid red;
      }

      input:focus:invalid, textarea:focus:invalid {
        outline: none;
      }

      .validation-message {
        margin: 0;
        padding: 0;
        color: red;
      }
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  connectedCallback() {
    const createNewNoteButton = this._shadowRoot.getElementById("add-note");
    const closeDialogButton = this._shadowRoot.getElementById("close-dialog");
    const dialog = this._shadowRoot.querySelector("dialog");
    const clickableArea = this._shadowRoot.querySelector(".clickable-area");

    createNewNoteButton.addEventListener("click", () => {
      dialog.showModal();
    });
    closeDialogButton.addEventListener("click", () => {
      dialog.close();
    });
    dialog.addEventListener("click", () => {
      dialog.close();
    });
    clickableArea.addEventListener("click", (event) => {
      event.stopPropagation();
    });

    const title = this._shadowRoot.getElementById("note-form-title");
    const titleError = this._shadowRoot.querySelector("#title-validation");
    const description = this._shadowRoot.getElementById(
      "note-form-description",
    );
    const descriptionError = this._shadowRoot.querySelector(
      "#description-validation",
    );

    const validateInput = (input, errorElement, label) => {
      if (input.validity.valid) {
        errorElement.textContent = "";
      } else {
        if (input.validity.valueMissing) {
          errorElement.textContent = `You need to input a ${label}`;
        } else if (input.validity.tooShort) {
          errorElement.textContent = `Character length should be at least ${input.minLength} characters; you entered ${input.value.length}.`;
        }
      }
    };

    title.addEventListener("change", () =>
      validateInput(title, titleError, "title"),
    );
    title.addEventListener("invalid", () =>
      validateInput(title, titleError, "title"),
    );
    title.addEventListener("blur", () =>
      validateInput(title, titleError, "title"),
    );
    description.addEventListener("change", () =>
      validateInput(description, descriptionError, "description"),
    );
    description.addEventListener("invalid", () =>
      validateInput(description, descriptionError, "description"),
    );
    description.addEventListener("blur", () =>
      validateInput(description, descriptionError, "description"),
    );

    this._shadowRoot
      .querySelector("form")
      .addEventListener("submit", (event) => this._onFormSubmit(event, this));
    this.addEventListener(this._submitEvent, this._onAddNoteSubmit);
  }

  _onFormSubmit(event, instance) {
    instance.dispatchEvent(new CustomEvent("noteapp:submit"));
    event.preventDefault();
  }

  _onAddNoteSubmit() {
    const title = this._shadowRoot.getElementById("note-form-title").value;
    const description = this._shadowRoot.getElementById(
      "note-form-description",
    ).value;

    this.dispatchEvent(
      new CustomEvent(this._addNoteEvent, {
        detail: { title, description },
      }),
    );
    this._shadowRoot.querySelector("dialog").close();
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <button id="add-note"></button>

      <dialog>
        <div class="clickable-area">
          <button id="close-dialog"></button>
          <form id="add-note-form" method="dialog" autocomplete="off">
            <label for="note-title">Title</label>
            <input 
              id="note-form-title" 
              name="note-title" 
              type="text"
              minlength="3"
              aria-describedby="title-validation" 
              autofocus
              required
            />
            <p id="title-validation" class="validation-message" aria-live="polite"></p>
            <label for="note-description">Description</label>
            <textarea 
              id="note-form-description" 
              name="note-description"
              type="text"
              minlength="5"
              aria-describedby="description-validation"
              required
            ></textarea>
            <p id="description-validation" class="validation-message" aria-live="polite"></p>
            <button type="submit">Add New Note</button>
          </form>
        </div>
      </dialog>
    `;
  }
}

customElements.define("add-note", AddNote);
