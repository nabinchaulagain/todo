import { LitElement, html, css } from 'lit-element';

class TodoItem extends LitElement {
  /** properties of component */
  static get properties() {
    return {
      /**
       * id of todo
       * passed from parent
       * @type {Number}
       */
      todoId: { type: Number },
      /**
       * indicates whether todo is completed or not
       * passed from parent
       * @type {Boolean}
       */
      isCompleted: { type: Boolean },
      /**
       * text of todo
       * passed from parent
       * @type {String}
       */
      text: { type: String },
      /**
       * function to run when toggle happens
       * passed from parent
       * @type {Function}
       */
      onToggle: { type: Function },
      /**
       * function to run when delete happens
       * passed from parent
       * @type {Function}
       */
      onDelete: { type: Function },
    };
  }

  /** component css */
  static get styles() {
    return css`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      .todo-card {
        background: #dddddd;
        margin: 10px 0;
        padding: 4px 0;
        border-radius: 10px;
        text-align: center;
      }

      .todo-controls {
        text-align: right;
        margin-right: 16px;
      }

      .completed {
        text-decoration: line-through;
      }
    `;
  }

  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  /** render html of the component */
  render() {
    return html`
      <li class="todo-card">
        <h2 class="todo-text ${this.isCompleted ? 'completed' : ''}">
          ${this.text}
        </h2>
        <div class="todo-controls">
          <button @click=${this.handleToggle} class="toggle-todo-btn">
            Mark as ${this.isCompleted ? 'incomplete' : 'complete'}
          </button>
          <button @click=${this.handleDelete} class="delete-todo-btn">
            Delete
          </button>
        </div>
      </li>
    `;
  }

  /** toggle todo item completion status*/
  handleToggle() {
    this.onToggle(this.todoId);
  }

  /** delete todo item */
  handleDelete() {
    this.onDelete(this.todoId);
  }
}

customElements.define('todo-item', TodoItem);
