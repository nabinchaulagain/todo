const formTemplate = document.createElement('template');
formTemplate.innerHTML = `
  <link rel="stylesheet" href="css/todo-form.css"></link>
  <form>
    <div class="input-container">
      <input type="text" class="todo-input" placeholder="Enter todo"/>
    </div>
    <input type="submit" value="Add Todo" class="submit-todo-btn"/>
  </form>
`;

class TodoForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(formTemplate.content.cloneNode(true));
  }

  /** when attached to dom */
  connectedCallback() {
    this.shadowRoot
      .querySelector('form')
      .addEventListener('submit', this.handleSubmit); // add submit listener to form
  }

  /** when detached from dom */
  disconnectedCallback() {
    this.removeEventListener('submit', this.handleSubmit);
  }

  /**
   * handle submit on form
   * @param {Event} ev - submit event on form
   */
  handleSubmit = (ev) => {
    ev.preventDefault();
    const inputEl = this.shadowRoot.querySelector('.todo-input');
    const { error, hasError } = this.validate(inputEl.value);
    if (hasError) {
      this.showError(error);
    } else {
      this.dispatchAddTodoEvent();
      this.deleteErrorEl();
      inputEl.value = '';
    }
  };

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

  /**
   * shows error message
   * @param {string} errorMsg - error message
   */
  showError(errorMsg) {
    this.initErrorEl();
    this.errorEl.innerText = errorMsg;
    this.shadowRoot.querySelector('.input-container').appendChild(this.errorEl);
  }

  /** initialize error element if not already initialized */
  initErrorEl() {
    if (!this.errorEl) {
      this.errorEl = document.createElement('div');
      this.errorEl.classList.add('input-error');
    }
  }

  /** delete error element if present */
  deleteErrorEl() {
    if (this.errorEl) {
      this.errorEl.parentNode.removeChild(this.errorEl);
    }
    this.errorEl = null;
  }
}

customElements.define('todo-form', TodoForm);
