'use strict';

const Model = require('../mongo.js');
const schema = require('./todo-schema.js');

class Todo extends Model {

  /**
   *Creates an instance of Todo.
   * @memberof Todo
   */
  constructor() { super(schema); }
}

module.exports = Todo;

