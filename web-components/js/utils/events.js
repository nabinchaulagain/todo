/**
 * return a custom addTodo event
 * @param {string} todo - todo text
 * @returns {CustomEvent} custom addTodo event with todo object in detail key of event
 */
const makeTodoAddEvent = (todo) => {
  return new CustomEvent('addTodo', { detail: { todo } });
};
