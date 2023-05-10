
//import { deleteTask } from "./index.js";

const addItem = require('./index.js addTask');

describe('addItem', () => {
  test('adds an item to the list', () => {
    document.body.innerHTML =
    '<div>' +
    '  <ul id="list"><li></li></ul>' +
    '</div>';
    addTask('Test item');
    const listItems = document.querySelectorAll('#list-container li');
    expect(listItems).toHaveLength(1);
  });
});
