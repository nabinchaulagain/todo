const todoListTemplate = document.createElement('template');
todoListTemplate.innerHTML = `
  <todo-form></todo-form>
  <div class="todos-container">
  </div>
`;

class TodoList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(todoListTemplate.content.cloneNode(true));
    this.todos = [];
  }

  /** when attached to dom */
  connectedCallback() {
    this.shadowRoot
      .querySelector('todo-form')
      .addEventListener('addTodo', this.addTodo);
  }

  /** when detached from dom */
  disconnectedCallback() {
    this.shadowRoot.querySelector('todo-form').removeEventListener('addTodo');
  }

  /**
   * @param {CustomEvent} ev - add todo event
   */
  addTodo = (ev) => {
    const newTodo = document.createElement('todo-item');
    newTodo.setAttribute('text', ev.detail.todo);
    newTodo.setAttribute('completed', false);
    this.shadowRoot.querySelector('.todos-container').appendChild(newTodo);
  };
}

customElements.define('todo-list', TodoList);
