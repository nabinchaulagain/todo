import { LitElement, html, css } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import generateId from '../utils/generateId';

import './todoForm';
import './todoItem';

class TodoList extends LitElement {
  /** properties of component */
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
      .root {
        max-width: 600px;
        margin: auto;
      }
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
   * add todo to state
   * @param {String} text - todo text
   */
  addTodo(text) {
    this.todos = [
      ...this.todos,
      {
        id: generateId(this.todos),
        text,
        completed: false,
      },
    ];
  }

  /**
   * toggle todo completion status
   * @param {Number} id - id of todo to toggle
   */
  toggleTodo(id) {
    this.todos = this.todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return { ...todo };
    });
  }

  /**
   * delete todo from state
   * @param {Number} id - id of todo to delete
   */
  deleteTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  /** render template */
  render() {
    return html`
      <div class="root">
        <todo-form .onAdd=${this.addTodo}></todo-form>
        <ul class="todo-list">
          ${repeat(
            this.todos,
            (todo) => todo.id,
            (todo) => html`<todo-item
              .id=${todo.id}
              .todoId=${todo.id}
              .text=${todo.text}
              ?isCompleted=${todo.completed}
              .onToggle=${this.toggleTodo}
              .onDelete=${this.deleteTodo}
            ></todo-item>`
          )}
        </ul>
      </div>
    `;
  }
}

customElements.define('todo-list', TodoList);
