class FooterBar extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  _courseurl = "";
  _coursename = "";

  static get observedAttributes() {
    return ["courseurl", "coursename"];
  }

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");

    this._courseurl = this.getAttribute("courseurl");
    this._coursename = this.getAttribute("coursename");
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        display: block;
      }

      div {
        color: white;
        text-align: center;
        padding: 0.5rem;
      }

      p {
        margin: 0.5rem;
      }

      a {
        color: inherit;
        text-decoration: none;
      }
    `;
  }

  set courseurl(value) {
    this._courseurl = value;
  }

  get courseurl() {
    return this._courseurl;
  }

  set coursename(value) {
    this._coursename = value;
  }

  get coursename() {
    return this._coursename;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "courseurl":
        this.courseurl = newValue;
        break;
      case "coursename":
        this.coursename = newValue;
        break;
    }

    this.render();
  }

  connectedCallback() {
    this.render();
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div>
          <p>
            &#169 2024 Notes App by Bima Adityo Kurniawan
          </p>
          <p>
            Made for Dicoding Submission: <a href="${this.courseurl}" target="_blank"><strong>${this.coursename}</strong></a>
          </p>
      </div>
    `;
  }
}

customElements.define("footer-bar", FooterBar);
