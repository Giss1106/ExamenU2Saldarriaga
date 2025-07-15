import { LitElement, html, css } from 'lit';

export class CareerSelector extends LitElement {
  static styles = css`
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    background: #ffffff;
    border: 1px solid #ddd;
    border-left: 5px solid #0052cc;
    padding: 12px 16px;
    margin-bottom: 10px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    font-weight: 500;
  }

  li:hover {
    background: #f0f8ff;
    transform: translateX(4px);
  }
`;


  constructor() {
    super();
    this.careers = [
      {
        nombre: 'Ingeniería en Software',
        facultad: 'Facultad de Ingeniería',
        descripcion: 'Forma profesionales en el desarrollo de sistemas de software modernos.',
        imagen:'https://zimbronapps.com/wp-content/uploads/2017/08/Ingenier%C3%ADa-de-Software-e1503435859442.png'
      },
      {
        nombre: 'Ingeniería Mecatrónica',
        facultad: 'Facultad de Mecánica',
        descripcion: 'Integra la mecánica, electrónica y control para crear sistemas inteligentes.',
        imagen:'https://mecatronica.utalca.cl/wp-content/uploads/2024/08/20221.png'
      },
      {
        nombre: 'Ingeniería en Biotecnología',
        facultad: 'Facultad de Ciencias de la Vida',
        descripcion: 'Aplica tecnologías a organismos vivos para innovación agrícola y médica.',
        imagen:'https://www.espam.edu.ec/recursos/plantilla/img/logos/biotecnologia1.png'
      },
      {
        nombre: 'Ingeniería en Petroquímica',
        facultad: 'Facultad de Energía y Procesos',
        descripcion: 'Estudia procesos químicos para la industria del petróleo y derivados.',
        imagen:'https://ingenieriapetroquimicaunefazulia.wordpress.com/wp-content/uploads/2012/03/logodelapromooo.jpg'
      }
    ];
  }

  handleClick(career) {
    this.dispatchEvent(new CustomEvent('career-selected', {
      detail: career,
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <ul>
        ${this.careers.map(c =>
          html`<li @click="${() => this.handleClick(c)}">${c.nombre}</li>`
        )}
      </ul>
    `;
  }
}

customElements.define('career-selector', CareerSelector);
