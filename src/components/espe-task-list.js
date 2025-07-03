import { LitElement, html, css } from 'lit-element';

export class EspeTaskList extends LitElement {
  static get properties() {
    return {
      tasks: { type: Array },
      theme: { type: String },
      showAddModal: { type: Boolean },
      selectedTask: { type: Object },
      editingTask: { type: Object },
      mostrarPorPrioridad: { type: Boolean }, 
    };
  }

  static styles = css`
  :host {
    display: block;
    font-family: 'Segoe UI', sans-serif;
    --color-primario: #00ff88;
    --color-fondo: #0d1d1d;
    --color-texto: #e0e0e0;
    --color-secundario: #1f2e2e;
    background-color: var(--color-fondo);
    color: var(--color-texto);
    min-height: 100vh;
    padding: 20px;
  }

  h3 {
    margin-top: 0;
    font-size: 1.4rem;
    color: white;
  }

  button {
    background-color: #00c374;
    color: white;
    border: none;
    padding: 10px 16px;
    margin-top: 10px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
  }

  .task-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--color-secundario);
    padding: 12px;
    margin: 8px 0;
    border-radius: 8px;
  }

  .task-name {
    font-weight: 500;
    cursor: pointer;
    flex-grow: 1;
  }

  .task-actions {
    display: flex;
    gap: 10px;
  }

  .task-time {
    font-size: 0.85rem;
    color: #b0b0b0;
    margin-top: 4px;
  }

  .section {
    margin-top: 20px;
  }

  .section-title {
    font-size: 1rem;
    color: #a0f5b9;
    border-bottom: 1px solid #2c4a4a;
    padding-bottom: 5px;
    margin-bottom: 10px;
  }

  .modal {
    background: #202a2a;
    color: white;
    border-radius: 10px;
    padding: 20px;
    max-width: 400px;
    margin: auto;
    position: fixed;
    top: 20%;
    left: 0;
    right: 0;
    z-index: 1000;
    animation: fadeIn 0.3s ease;
  }

  input, textarea, select {
    background-color: #2c3c3c;
    color: white;
    border: 1px solid #444;
    padding: 8px;
    margin: 6px 0;
    border-radius: 5px;
    width: 100%;
  }

  .hidden {
    display: none;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
`;


  constructor() {
    super();
    this.tasks = [];
    this.theme = 'claro';
    this.showAddModal = false;
    this.selectedTask = null;
    this.editingTask = null;
    this.mostrarPorPrioridad = false;
  }

  connectedCallback() {
    super.connectedCallback();
    const saved = localStorage.getItem('tasks');
    if (saved) {
      this.tasks = JSON.parse(saved);
    }
  }

  firstUpdated() {
    if (!Array.isArray(this.tasks)) this.tasks = [];
    if (!['claro', 'oscuro'].includes(this.theme)) this.theme = 'claro';
    this.setAttribute('class', this.theme);
  }

  updated(changedProps) {
    if (changedProps.has('tasks')) {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
    if (changedProps.has('theme')) {
      this.setAttribute('class', this.theme);
    }
  }

  render() {
    
    const hoy = new Date().toISOString().slice(0, 10);
    const manana = new Date(Date.now() + 86400000).toISOString().slice(0, 10);

    const tareasHoy = this.tasks.filter(t => t.fecha === hoy && !t.completada);
    const tareasManana = this.tasks.filter(t => t.fecha === manana && !t.completada);

    return html`
    
       <div class="section">
      <div class="section-title">Hoy</div>
      ${tareasHoy.map(task => this.renderTask(task))}
    </div>
    <div class="section">
      <div class="section-title">Mañana</div>
      ${tareasManana.map(task => this.renderTask(task))}
    </div>

    <button @click="${this.abrirModalAgregar}">+ Agregar Tarea</button>
    <button @click="${this.togglePrioridad}">Ver por prioridad</button>

    ${this.mostrarPorPrioridad ? html`
      <div class="section">
        <div class="section-title">Alta Prioridad</div>
        ${this.tasks.filter(t => t.prioridad === 'Alta' && !t.completada)
          .map(t => this.renderTask(t))}
      </div>
      <div class="section">
        <div class="section-title">Media Prioridad</div>
        ${this.tasks.filter(t => t.prioridad === 'Media' && !t.completada)
          .map(t => this.renderTask(t))}
      </div>
      <div class="section">
        <div class="section-title">Baja Prioridad</div>
        ${this.tasks.filter(t => t.prioridad === 'Baja' && !t.completada)
          .map(t => this.renderTask(t))}
      </div>
    ` : ''}

      <!-- <div id="tasks-container">
        ${this.tasks.map(task => html`
          <div class="task-item">
            <span class="task-name" @click="${() => this.abrirModalDetalles(task)}">${task.nombre}</span>
            <div>
              <button @click="${(e) => { e.stopPropagation(); this.editarTarea(task); }}">Editar</button>
              <button @click="${(e) => { e.stopPropagation(); this.eliminarTarea(task.id); }}">Eliminar</button>
            </div>
          </div>
        `)}
      </div> -->

      <!-- Modal Agregar/Editar -->
      <div class="modal ${this.showAddModal ? '' : 'hidden'}" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <h3 id="modal-title">${this.editingTask ? 'Editar tarea' : 'Nueva tarea'}</h3>
        <input id="task-name" placeholder="Nombre" .value="${this.editingTask?.nombre || ''}">
        <textarea id="task-detail" placeholder="Detalle">${this.editingTask?.detalle || ''}</textarea>
        <input type="date" id="task-date" .value="${this.editingTask?.fecha || ''}">
        <input type="time" id="task-time" .value="${this.editingTask?.hora || ''}">
        <select id="task-priority">
          <option value="Alta" ?selected="${this.editingTask?.prioridad === 'Alta'}">Alta</option>
          <option value="Media" ?selected="${this.editingTask?.prioridad === 'Media'}">Media</option>
          <option value="Baja" ?selected="${this.editingTask?.prioridad === 'Baja'}">Baja</option>
        </select>
        <button @click="${this.guardarTarea}">Guardar</button>
        <button @click="${this.cerrarModales}">Cancelar</button>
      </div>

      <!-- Modal Detalles -->
      ${this.selectedTask ? html`
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="detail-title">
          <h3 id="detail-title">${this.selectedTask.nombre}</h3>
          <p><strong>Hora:</strong> ${this.selectedTask.hora}</p>
          <p><strong>Detalle:</strong> ${this.selectedTask.detalle}</p>
          <p><strong>Fecha:</strong> ${this.selectedTask.fecha}</p>
          <p><strong>Hora:</strong> ${this.selectedTask.hora}</p>
          <p><strong>Prioridad:</strong> ${this.selectedTask.prioridad}</p>
          <button @click="${() => this.completarTarea(this.selectedTask.id)}">Completar</button>
          <button @click="${this.cerrarModales}">Cerrar</button>
        </div>
      ` : ''}
    `;
  }
  renderTask(task) {
  return html`
    <div class="task-item">
      <div class="task-name" @click="${() => this.abrirModalDetalles(task)}">
        ${task.nombre}
        ${task.hora ? html`<div class="task-time">${task.hora}</div>` : ''}
      </div>
      <div class="task-actions">
        <button @click="${(e) => { e.stopPropagation(); this.editarTarea(task); }}">✏️</button>
        <button @click="${(e) => { e.stopPropagation(); this.eliminarTarea(task.id); }}">🗑️</button>
      </div>
    </div>
  `;
}
  togglePrioridad() {
    this.mostrarPorPrioridad = !this.mostrarPorPrioridad;
  }

  abrirModalAgregar() {
    this.editingTask = null;
    this.showAddModal = true;
    this.selectedTask = null;
  }

  editarTarea(task) {
    this.editingTask = { ...task };
    this.showAddModal = true;
    this.selectedTask = null;
  }

  guardarTarea() {
  const nameInput = this.shadowRoot.querySelector('#task-name');
  const detailInput = this.shadowRoot.querySelector('#task-detail');
  const dateInput = this.shadowRoot.querySelector('#task-date');
  const timeInput = this.shadowRoot.querySelector('#task-time');
  const prioritySelect = this.shadowRoot.querySelector('#task-priority');

  const name = nameInput.value.trim();
  const detail = detailInput.value.trim();
  const date = dateInput.value;
  const time = timeInput.value;
  const priority = prioritySelect.value;

  if (!name) {
    alert('El nombre es obligatorio');
    return;
  }

  if (this.editingTask) {
    this.tasks = this.tasks.map(task =>
      task.id === this.editingTask.id
        ? { ...task, nombre: name, detalle: detail, fecha: date, hora: time, prioridad: priority }
        : task
    );
  } else {
    const newTask = {
      id: Date.now(),
      nombre: name,
      detalle: detail,
      fecha: date,
      hora: time,
      prioridad: priority,
      completada: false,
    };
    this.tasks = [...this.tasks, newTask];
    this.dispatchEvent(new CustomEvent('task-added', {
      detail: { task: newTask },
      bubbles: true,
      composed: true,
    }));
  }

  this.showAddModal = false;
  this.editingTask = null;
}


  eliminarTarea(id) {
    const confirmar = confirm('¿Estás seguro de que deseas eliminar esta tarea?');
  if (confirmar) {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }
  }

  completarTarea(id) {
    this.tasks = this.tasks.map(task =>
      task.id === id ? { ...task, completada: true } : task
    );
    this.dispatchEvent(new CustomEvent('task-completed', {
      detail: { id },
      bubbles: true,
      composed: true,
    }));
    this.selectedTask = null;
  }

  abrirModalDetalles(task) {
    this.selectedTask = task;
    this.showAddModal = false;
    this.editingTask = null;
  }

  cerrarModales() {
    this.showAddModal = false;
    this.selectedTask = null;
    this.editingTask = null;
  }
}

customElements.define('espe-task-list', EspeTaskList);
