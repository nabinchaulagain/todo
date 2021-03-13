import { render, html } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat';
import generateId from '../utils/generateId';

class TodoList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.todos = [];
    this.render();
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.toggleTodo = this.toggleTodo.bind(this);
  }

  /** when attached to dom */
  connectedCallback() {
    this.shadowRoot
      .querySelector('todo-form')
      .addEventListener('addTodo', this.addTodo);

    this.shadowRoot.addEventListener('toggleTodo', this.toggleTodo);
    this.shadowRoot.addEventListener('deleteTodo', this.deleteTodo);
  }

  /** when detached from dom */
  disconnectedCallback() {
    this.shadowRoot
      .querySelector('todo-form')
      .removeEventListener('addTodo', this.addTodo);
  }

  /**
   * handler for addTodo event raised by todoForm component
   * @param {CustomEvent} ev - custom add todo event
   */
  addTodo(ev) {
    this.todos.push({
      id: generateId(this.todos),
      text: ev.detail.todo,
      completed: false,
    });
    this.render(); // re render to show new todo
  }

  /**
   * handler for toggleTodo event
   * @param {CustomEvent} ev - custom toggle todo event
   */
  toggleTodo(ev) {
    this.todos = this.todos.map((todo) => {
      if (todo.id === ev.detail.id) {
        return { ...todo, completed: !todo.completed };
      }
      return { ...todo };
    });
    this.render();
  }

  /**
   * handler for deleteTodo event
   * @param {CustomEvent} ev - cutsom delete todo event
   */
  deleteTodo(ev) {
    this.todos = this.todos.filter((todo) => todo.id !== ev.detail.id);
    this.render();
  }

  /** render template */
  render() {
    const template = html`
      <link rel="stylesheet" href="css/todo-list.css"></link>
      <todo-form></todo-form>
      <ul class="todo-list">
        ${repeat(
          this.todos,
          (todo) => todo.id,
          (todo) => html`<todo-item
            id=${todo.id}
            todoId=${todo.id}
            text=${todo.text}
            ?completed=${todo.completed}
          ></todo-item>`
        )}
      </ul>
    `;
    render(template, this.shadowRoot);
  }
}

customElements.define('todo-list', TodoList);
