import { html, LitElement, css } from 'lit-element';
import '@material/mwc-snackbar';


class CharacterComponent extends LitElement {
  static get properties() {
    return {
      characterNumber: { type: Number },
      character: { type: Object },
      url: { type: String }
    };
  }

  static get styles() {
    return css `
        .img-character {
          margin-left: 25%;
          margin-top: 15px;
          border-radius: 50%;
          height: 100px;
          width: 100px;
        }
        .character {
          border: 1px solid black;
          border-radius: 10px;
          width: 200px;
          height: 300px;
          margin: 5px 50px;
          padding: 10px;
        }

        .btn {
          color: White;
          background-color: blue;
          border-bottom: 5px solid green;
          border-radius: 10px; 
          text-transform: Capitalize;
        }

        .btn:hover {
          cursor: pointer;
        }

        h2 {
          text-align: center;
          margin-bottom: 5px;
        }
        .especificacion {
            padding: 10px;
            margin: 10px;
            text-transform: Capitalize;
            text-align: center;
        }

        .green {
          color: green;
          font-weight: bold;
        }

        .red {
          color: red;
          font-weight: italic;
        }
        `;
  }

  constructor() {
    super();
    this.characterNumber = 1;
    this.character = {};
  }

  async connectedCallback() {
    super.connectedCallback();
    let data = await this.api();
  }

  render() {
    return html`
        <div class="character">
          <img src="${this.character.image}" alt="imagen-character" class="img-character">
          <div>
            <h2>${this.character.name}</h2>
            <hr>
            <div class="especificacion">
              <label>especie: ${this.character.species}</label><br>
              <label class="${this.character.status == 'Alive' ? 'green': 'red'}">Status: ${this.character.status}</label>
            </div>
            <button @click="${this.nextCharacter}" class="btn">next character</button>
            <mwc-snackbar id="message"></mwc-snackbar>
          </div>
        </div>
      `;
    }

    api() {
      this.connectedApi(this.characterNumber);
    }

    nextCharacter() {
      this.characterNumber++;
      const snackBar = this.shadowRoot.querySelector('#message');
      this.connectedApi(this.characterNumber);
      snackBar.labelText = `el numero del personaje es ${this.characterNumber}`;
      snackBar.show();
    }


    async connectedApi(id) {
      const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
      const data =  await response.json();
      this.character = data;
      console.log(this.character);
      return this.character;
    }

    
}

window.customElements.define("character-component", CharacterComponent);
