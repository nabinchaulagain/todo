import { render, html } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat';
import generateId from '../utils/generateId';

class TodoList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.todos = [];
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.toggleTodo = this.toggleTodo.bind(this);
    this.render();
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
            ?completed=${todo.completed}
          ></todo-item>`
        )}
      </ul>
    `;
    render(template, this.shadowRoot);
  }
}

customElements.define('todo-list', TodoList);
