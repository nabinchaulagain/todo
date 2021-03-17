import { LitElement, html, css } from 'lit-element';

class TodoForm extends LitElement {
  /** properties of component */
  static get properties() {
    return {
      /**
       * form error
       * @type {String | null}
       */
      error: { type: String },
      /**
       * function to execute when todo is added
       * @type {Function}
       */
      onAdd: { type: Function },
      /**
       * input text
       * @type {String}
       */
      input: { type: String },
    };
  }

  /** css of component */
  static get styles() {
    return css`
      form {
        text-align: center;
      }

      .todo-input {
        width: 100%;
        display: block;
        margin-bottom: 8px;
        padding: 8px 4px;
        font-size: 16px;
      }

      .submit-todo-btn {
        font-size: 20px;
      }

      .input-container .input-error {
        color: #ff0000;
        margin-top: -4px;
        font-size: 16px;
      }
    `;
  }

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.input = '';
    this.error = null;
    this.onAdd = () => {};
  }

  /**
   * handle submit on form
   * @param {Event} ev - submit event on form
   */
  handleSubmit(ev) {
    ev.preventDefault();
    const { error, hasError } = this.validate();
    if (hasError) {
      this.error = error;
    } else {
      this.onAdd(this.input);
      this.input = '';
      this.error = null;
    }
  }

  handleInputChange(ev) {
    this.input = ev.target.value;
  }

  /**
   * validate todo input
   * @param {string} value - value of input field
   * @returns {{ hasError: boolean, error:string|undefined }} object that contains hasError and error properties
   */
  validate() {
    const value = this.input;
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

  /** template of component */
  render() {
    return html`
      <form @submit=${this.handleSubmit}>
        <div class="input-container">
          <input
            type="text"
            class="todo-input"
            @change=${this.handleInputChange}
            .value="${this.input}"
          />
          ${this.error && html`<div class="input-error">${this.error}</div>`}
        </div>
        <input type="submit" value="Add Todo" class="submit-todo-btn" />
      </form>
    `;
  }
}

customElements.define('todo-form', TodoForm);
