const todoListTemplate = document.createElement('template');
todoListTemplate.innerHTML = `
  <link rel="stylesheet" href="css/todo-list.css"></link>
  <todo-form></todo-form>
  <ul class="todo-list">
  </ul>
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
    this.shadowRoot.querySelector('.todo-list').appendChild(newTodo);
  };
}

customElements.define('todo-list', TodoList);
