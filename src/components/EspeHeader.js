import { LitElement, html, css } from 'lit-element';

export class EspeHeader extends LitElement {
  static styles = css`
    :host {
      display: block;
      background-color: #0d1d1d;
      color: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.4);
    }

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 24px;
      font-family: 'Segoe UI', sans-serif;
    }

    .title {
      font-size: 1.5rem;
      font-weight: bold;
      color: #00ff88;
    }

    nav {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    button {
      background: none;
      border: none;
      color: white;
      font-size: 1rem;
      cursor: pointer;
      font-weight: 500;
    }

    button:hover {
      color: #00ff88;
    }

    .icon, .profile {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      object-fit: cover;
      cursor: pointer;
    }

    .icon {
      filter: invert(100%);
    }
  `;

  render() {
    return html`
      <header>
        <div class="title">ESPE Task Manager</div>
        <nav>
          <button>Inicio</button>
          <button>Tareas</button>
          <button>Calendario</button>
          <button>Notas</button>
          <img class="icon" src="https://cdn-icons-png.flaticon.com/512/1827/1827392.png" alt="Notificaciones">
          <img class="profile" src="https://i.pravatar.cc/150?img=3" alt="Usuario">
        </nav>
      </header>
    `;
  }
}

customElements.define('espe-header', EspeHeader);
