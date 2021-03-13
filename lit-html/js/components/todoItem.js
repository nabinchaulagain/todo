import { render, html } from 'lit-html';
import { makeTodoDeleteEvent, makeTodoToggleEvent } from '../utils/events';

class TodoItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleDelete = this.handleDelete.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  /** when attached to dom */
  connectedCallback() {
    this.render();
  }

  /** load attributes as properties */
  getDataFromAttribs() {
    this.todoId = parseInt(this.getAttribute('todoId'));
    this.isCompleted = this.hasAttribute('completed');
    this.todoText = this.getAttribute('text');
  }

  /** render html on the component */
  render() {
    this.getDataFromAttribs();
    const template = html`
      <link rel="stylesheet" href="css/todo-item.css"></link>
      <li class="todo-card">
        <h2 class="todo-text ${this.isCompleted ? 'completed' : ''}">
          ${this.todoText}
        </h2>
        <div class="todo-controls">
          <button @click=${this.handleToggle} class="toggle-todo-btn">
            Mark as ${this.isCompleted ? 'incomplete' : 'complete'}
          </button>
          <button @click=${this.handleDelete} class="delete-todo-btn">
           Delete
          </button>
        </div>
      </li>
    `;
    render(template, this.shadowRoot);
  }

  /** toggle todo item completion status*/
  handleToggle() {
    this.dispatchEvent(makeTodoToggleEvent(this.todoId));
    this.render();
  }

  /** delete todo item */
  handleDelete() {
    this.dispatchEvent(makeTodoDeleteEvent(this.todoId));
  }
}

customElements.define('todo-item', TodoItem);
