import { LitElement, html, css } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import generateId from '../utils/generateId';

class TodoList extends LitElement {
  /** properites of component */
  static get properties() {
    return {
      /**
       * @type {Object[]}
       * list of todo objects
       */
      todos: { type: Array },
    };
  }

  /** component css */
  static get styles() {
    return css`
      .todo-list {
        list-style: none;
      }
    `;
  }

  constructor() {
    super();
    this.todos = [];
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.toggleTodo = this.toggleTodo.bind(this);
  }

  /**
   * handler for addTodo event raised by todoForm component
   * @param {CustomEvent} ev - custom add todo event
   */
  addTodo(ev) {
    this.todos = [
      ...this.todos,
      {
        id: generateId(this.todos),
        text: ev.detail.todo,
        completed: false,
      },
    ];
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
  }

  /**
   * handler for deleteTodo event
   * @param {CustomEvent} ev - cutsom delete todo event
   */
  deleteTodo(ev) {
    this.todos = this.todos.filter((todo) => todo.id !== ev.detail.id);
  }

  /** render template */
  render() {
    return html`
      <todo-form @addTodo=${this.addTodo}></todo-form>
      <ul
        class="todo-list"
        @toggleTodo=${this.toggleTodo}
        @deleteTodo=${this.deleteTodo}
      >
        ${repeat(
          this.todos,
          (todo) => todo.id,
          (todo) => html`<todo-item
            id=${todo.id}
            todoId=${todo.id}
            text=${todo.text}
            ?isCompleted=${todo.completed}
          ></todo-item>`
        )}
      </ul>
    `;
  }
}

customElements.define('todo-list', TodoList);
