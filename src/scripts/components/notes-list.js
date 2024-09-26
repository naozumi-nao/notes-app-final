class NotesList extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");

    this.render();
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        display: block;
      }

      .note-list {
        display: grid;
        justify-content: left;
        align-items: baseline;
        grid-template-columns: repeat(auto-fit, 37ch);
        gap: 1rem;
        margin: 1rem;
        margin-bottom: 3rem;
      }
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div class="note-list">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define("notes-list", NotesList);
