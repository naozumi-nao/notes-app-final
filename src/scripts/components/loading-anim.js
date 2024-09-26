class LoadingAnim extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        display: flex;
        flex-flow: column nowrap;
        justify-items: center;
        align-items: center;
        text-align: center;
        color: #3092e2;
        font-size: 1.75rem;
      }

      .loading-ring,
      .loading-ring div {
        box-sizing: border-box;
      }
      .loading-ring {
        width: 100px;
        height: 100px;
      }
      .loading-ring div {
        display: block;
        position: absolute;
        width: 100px;
        height: 100px;
        border: 12px solid #3092e2;
        border-radius: 50%;
        animation: loading-ring 1.75s linear infinite;
        border-color: #3092e2 #3092e2 #3092e2 transparent;
      }

      @keyframes loading-ring {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    `;
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
      <div class="loading-ring">
        <div></div>
      </div>
      <p>Loading Data...</p>
    `;
  }
}

customElements.define("loading-anim", LoadingAnim);
