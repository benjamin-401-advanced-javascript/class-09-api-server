'use strict';

const uuid = require('uuid/v4');

class Model {

  /**
   *Creates an instance of Model.
   * @memberof Model
   */
  constructor() {
    this.database = [];
  }

  /**
   *
   *
   * @param {*} id
   * @returns Promise - resolves with the id to get
   * @memberof Model
   */
  get(id) {
    let response = id ? this.database.filter((record) => record.id === id) : this.database;
    return Promise.resolve(response);
  }

  /**
   * creates a new record in the database out of entry
   * @param {*} entry
   * @returns Promise - resolves to a newly created record
   * @memberof Model
   */
  create(entry) {
    entry.id = uuid();
    let record = this.sanitize(entry);
    if (record.id) { this.database.push(record); }
    return Promise.resolve(record);
  }

  /**
   * updates on record by id by replacing it with the entry
   * @param {*} id
   * @param {*} entry
   * @returns Promise - resolves to a newly updated record
   * @memberof Model
   */
  update(id, entry) {
    let record = this.sanitize(entry);
    if (record.id) { this.database = this.database.map((item) => (item.id === id) ? record : item); }
    return Promise.resolve(record);
  }

  /**
   * deletes one record by id from database
   * @param {*} id
   * @returns Promise
   * @memberof Model
   */
  delete(id) {
    this.database = this.database.filter((record) => record.id !== id);
    return Promise.resolve();
  }

  /**
   * makes sure the entry matches the schema
   *
   * @param {*} entry
   * @returns the valid record or undefined
   * @memberof Model
   */
  sanitize(entry) {

    let valid = true;
    let record = {};
    let schema = this.schema();

    Object.keys(schema).forEach(field => {
      if (schema[field].required) {
        if (entry[field]) {
          record[field] = entry[field];
        } else {
          valid = false;
        }
      }
      else {
        record[field] = entry[field];
      }
    });

    return valid ? record : undefined;
  }

}

module.exports = Model;
