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
    this.attachEventListeners();
  }

  /** load attributes as properties */
  getDataFromAttribs() {
    this.todoId = parseInt(this.getAttribute('todoId'));
    this.isCompleted = this.hasAttribute('completed');
    this.todoText = this.getAttribute('text');
  }

  /** add event listeners to toggle and delete button */
  attachEventListeners() {
    this.shadowRoot
      .querySelector('.toggle-todo-btn')
      .addEventListener('click', this.handleToggle);

    this.shadowRoot
      .querySelector('.delete-todo-btn')
      .addEventListener('click', this.handleDelete);
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
          <button class="toggle-todo-btn">
            Mark as ${this.isCompleted ? 'incomplete' : 'complete'}
          </button>
          <button class="delete-todo-btn">Delete</button>
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

  /** when detached from dom */
  disconnectedCallback() {
    this.shadowRoot
      .querySelector('.toggle-todo-btn')
      .removeEventListener('click', this.handleToggle);

    this.shadowRoot
      .querySelector('.delete-todo-btn')
      .removeEventListener('click', this.handleDelete);
  }
}

customElements.define('todo-item', TodoItem);
