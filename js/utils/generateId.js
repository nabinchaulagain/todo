/**
 * generates a id based on an array
 * @param {[ { id: number } ]} list - an array of objects having id keys
 * @returns {number} new id
 */
const generateId = (list) => {
  if (list.length === 0) {
    return 1; // if no items in list start id numbering with id=1
  }
  return list[list.length - 1].id + 1; // new id is the id of the last item of the list incremented by 1
};

export default generateId;
