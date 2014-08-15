var grunt = require('grunt');

/**
 * Prompt, utility to configure and run grunt-prompt.
 * @see https://github.com/dylang/grunt-prompt
 *
 * @example
 * var prompt = require('prompt');
 * prompt('create-component')
 *  .addQuestion({
 *      config: 'myTask.newComponentName',
 *      type: 'input',
 *      message: 'Enter name for new component'
 *  })
 *  .addQuestion({
 *      config: 'myTask.newComponentDependencies',
 *      type: 'checkbox',
 *      message: 'Select dependencies',
 *      choices: [ ... ]
 *  })
 *  .open(['create-component','register-component']);
 *  // opens prompt with two questions and
 *  // runs create-component and register-component after,
 *  // in which `myTask` config is available.
 */

/**
 * This utility helps to construct a Prompt using grunt-promt:
 * @see https://github.com/dylang/grunt-prompt#grunt-prompt-
 * @param {String} name     name of task to run after prompt
 * @constructor
 */
function Prompt (name) {
	'use strict';
	this.name = name;
	this.questions = [];
}

/**
 * Add a question to this prompt. Each question can be
 * configured using the same options as in grunt-prompt:
 * @see https://github.com/dylang/grunt-prompt#options
 * @param {Object} question
 */
Prompt.prototype.addQuestion = function (question) {
	'use strict';
	var prompt = this;
	prompt.questions.push(question);
	return prompt;
};

/**
 * Creates config options and registers prompt under its name.
 * @returns {Prompt}
 */
Prompt.prototype.register = function () {
	'use strict';
	var prompt = this;
	var config = {
		options: {
			questions: prompt.questions
		}
	};
	grunt.config('prompt.' + prompt.name, config);
	return prompt;
};

/**
 * Opens prompt with constructed questions and runs task
 * corresponding with the prompt's name.
 * @param {Array} [nextTasks]   Tasks to run after prompt.
 *  By default runs task with name of this prompt.
 */
Prompt.prototype.open = function (nextTasks) {
	'use strict';
	var prompt = this;
	prompt.register();
	var tasks = nextTasks || [prompt.name];
	tasks.unshift('prompt:' + prompt.name);
	grunt.task.run(tasks);
};

/**
 * Create and return a new prompt with given name.
 * @param {String} name
 * @returns {Prompt}
 */
function createPrompt (name) {
	'use strict';
	return new Prompt(name);
}

module.exports = createPrompt;