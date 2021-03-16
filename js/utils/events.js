/**
 * return a custom addTodo event
 * @param {string} todo - todo text
 * @returns {CustomEvent} custom addTodo event with todo object in detail key of event
 */
export const makeTodoAddEvent = (todo) => {
  return new CustomEvent('addTodo', { detail: { todo } });
};

/**
 * return a custom toggleTodo event
 * @param {number} id - todo id
 * @returns {CustomEvent} custom toggleTodo event with id of todo in detail
 */
export const makeTodoToggleEvent = (id) => {
  return new CustomEvent('toggleTodo', { detail: { id }, bubbles: true });
};

/**
 * return a custom deleteTodo event
 * @param {number} id - todo id
 * @returns {CustomEvent} custom deleteTodo event with id of todo in detail
 */
export const makeTodoDeleteEvent = (id) => {
  return new CustomEvent('deleteTodo', { detail: { id }, bubbles: true });
};
