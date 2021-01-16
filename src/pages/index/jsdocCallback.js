

/**
 * Callback for adding two numbers.
 *
 * @callback addStuffCallback
 * @param {number} sum - An integer.
 */

/**
 * Add two numbers together, then pass the results to a callback function.
 *
 * @param {number} x - An integer.
 * @param {number} y - An integer.
 * @param {addStuffCallback} callback - A callback to run.
 */
function addStuff(x, y, callback) {
    callback(x + y);
}

/**
 * Add two numbers together, then pass the results to a callback function.
 *
 * @param {number} x - An integer.
 * @param {number} y - An integer.
 * @param {function(number):void} callback - A callback to run.
 */
function addStuff2(x, y, callback) {
    callback(x + y);
}
