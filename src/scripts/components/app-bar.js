import noteIcon from "./assets/note-icon.svg";

class AppBar extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  _appname = "";

  static getobservedAttributes() {
    return ["appname"];
  }

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");

    this._appname = this.getAttribute("appname");
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        display: block;
        color: white;
      }

      div {
        text-align: center;
        margin: 24px;
        display: flex;
        flex-flow: column no-wrap;
        justify-content: center;
      }

      .app-icon {
        width: 50px;
        height: 50px;
        margin: auto 16px;
      }

      h1 {
        margin: 0;
      }
    `;
  }

  set appname(value) {
    this._appname = value;
  }

  get appname() {
    return this._appname;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.appname = newValue;
    this.render();
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div>
        <img class="app-icon" src=${noteIcon}>
        <h1>${this.appname}</h1>
      </div>
    `;
  }
}

customElements.define("app-bar", AppBar);
