import { render, html } from 'lit-html';
import { makeTodoAddEvent } from '../utils/events';

class TodoForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleSubmit = this.handleSubmit.bind(this);
    this.render();
  }

  /**
   * handle submit on form
   * @param {Event} ev - submit event on form
   */
  handleSubmit(ev) {
    ev.preventDefault();
    const inputEl = this.shadowRoot.querySelector('.todo-input');
    const { error, hasError } = this.validate(inputEl.value);
    if (hasError) {
      this.error = error;
    } else {
      this.dispatchAddTodoEvent();
      inputEl.value = '';
      this.error = null;
    }
    this.render(); // re render to show error or remove any previous error
  }

  /** add todo item */
  dispatchAddTodoEvent() {
    const todoVal = this.shadowRoot.querySelector('.todo-input').value;
    this.dispatchEvent(makeTodoAddEvent(todoVal));
  }

  /**
   * validate todo input
   * @param {string} value - value of input fieldi
   * @returns {{ hasError: boolean, error:string|undefined }} object that contains hasError and error properties
   */
  validate(value) {
    if (!value) {
      return { hasError: true, error: 'Todo is required' };
    } else if (value.length < 3) {
      return {
        hasError: true,
        error: 'Todo should be at least 3 characters long',
      };
    }
    return { hasError: false };
  }

  render() {
    const template = html`
      <link rel="stylesheet" href="css/todo-form.css"></link>
      <form @submit=${this.handleSubmit}>
        <div class="input-container">
          <input type="text" class="todo-input" placeholder="Enter todo" />
          ${this.error && html`<div class="input-error">${this.error}</div>`}
        </div>
        <input type="submit" value="Add Todo" class="submit-todo-btn" />
      </form>
    `;
    render(template, this.shadowRoot);
  }
}

customElements.define('todo-form', TodoForm);
