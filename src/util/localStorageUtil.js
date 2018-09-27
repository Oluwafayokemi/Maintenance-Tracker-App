/**
 * @class Abstracts the localStorage api
 * This would ensure that all items saved on the localStorage are uniform
 */
class localStorageUtil {
  /**
     * @description Retrieves an item from the localStorage
     * @param {String} name The name of the object to be retrieved
     * @returns {Object}
     */
  static getItem(name) {
    const result = localStorage.getItem(name);
    return result === 'undefined' ? undefined : JSON.parse(result);
  }

  /**
     * @description Saves an object to the browsers localStorage
     * @param {String} name The name to save the object with
     * @param {Object} data The object to be saved to the localStorage
     * @returns {null}
     */
  static setItem(name, data) {
    const value = JSON.stringify(data);
    localStorage.setItem(name, value);
  }
}

export default localStorageUtil;

