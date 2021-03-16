const todoItemTemplate = document.createElement('template');
todoItemTemplate.innerHTML = `
  <link rel="stylesheet" href="css/todo-item.css"></link>
  <link rel="stylesheet" href="css/reset.css"></link>
  <li class="todo-card">
    <h2 class="todo-text"></h2>
    <div class="todo-controls">
      <button class="toggle-todo-btn">u<button>
      <button class="delete-todo-btn">Delete<button>
    </div>
  </li>
`;

class TodoItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(todoItemTemplate.content.cloneNode(true));
  }

  /** when attached to dom */
  connectedCallback() {
    this.isCompleted = this.getAttribute('completed') === true;
    this.todoText = this.getAttribute('text');
    this.render();
    this.attachEventListeners();
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
    const textEl = this.shadowRoot.querySelector('.todo-text');
    textEl.innerText = this.todoText;

    const editBtn = this.shadowRoot.querySelector('.toggle-todo-btn');
    editBtn.innerText = `Mark as ${
      this.isCompleted ? 'incomplete' : 'complete'
    }`;

    const todoCard = this.shadowRoot.querySelector('.todo-card');
    if (this.isCompleted) {
      todoCard.classList.add('completed');
    } else {
      todoCard.classList.remove('completed');
    }
  }

  /** toggle todo item completion status*/
  handleToggle = () => {
    this.isCompleted = !this.isCompleted;
    this.render();
  };

  /** delete todo item */
  handleDelete = () => {
    this.parentNode.removeChild(this);
  };

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
