var prompt = require('../utilities/prompt');

/**
 * Task Wizard prompts user all available grunt tasks, and
 * asks the user for optional arguments to run the task with.
 * When prompt closes `task-wizard:run-task` is executed,
 * which runs the selected task with the given arguments.
 * This way users don't need to know tasks by heart, just
 * type: `grunt task-wizard` to get started. To make it even
 * easier for your users you can make this the default task
 * by setting `grunt.registerTask('default', ['task-wizard']);`
 * at the end of you `Gruntfile.js`.
 */

module.exports = function (grunt) {
    'use strict';
    grunt.registerTask(
        'task-wizard',
        'Execute any grunt task using wizard (prompt).',
        /**
         * Just follow the wizard after running `task-wizard` without any arguments.
         * The wizard will set taskWizard config properties based on answers and will
         * run itself again for the next step. So don't bother entering task params manually.
         * @param {String} [action]     Action to perform.
         *  Expects wither 'run-task' or undefined.
         *  If no argument is given prompts to select task
         */
        function (action) {

	        var wizard = grunt.config('taskWizard');

	        /**
	         * Task wizard assumes project tasks are defined in `tasks/grunt/tasks`.
	         * @param {Object} task
	         * @returns {boolean}
	         */
	        function isProjectTask(task){
		        return (task.meta.filepath.indexOf('tasks/grunt/tasks/') >= 0);
	        }

	        /**
	         * Return pretty list of tasks to choose from with task name and info.
	         * @param {String} category     Expects 'project', 'npm', or 'all'.
	         * @returns {Array} tasks to choose from
	         */
	        function getTaskChoices (category) {
		        var tasks = grunt.task._tasks;
		        return Object.keys(tasks)
			        .sort()
			        .filter(function (name) { // limit to project tasks
				        var task = tasks[name];
				        switch(category) {
				        case 'all':
					        return true;
				        case 'npm':
					        return !isProjectTask(task);
				        case 'project':
					        return isProjectTask(task);
				        default:
							return isProjectTask(task);
				        }
			        })
			        .map(function (name) {
				        var task = tasks[name];
				        if (task.multi) {
					        name += '*';
				        }
				        return {
					        name: (name.magenta + ': ' + task.info),
					        value: task.name
				        };
			        });
	        }

	        /**
	         * Builds a prompt for 'select-task' with questions to
	         *   * select task category
	         *   * select task to execute (per category)
	         *   * enter arguments (if not project task)
	         * Open the prompt and run selected task after completion.
	         */
	        function promptForTask () {
		        prompt('select-task')
			        .addQuestion({
				        config: 'taskWizard.taskCategory',
				        type: 'list',
				        message: 'Select task category',
				        choices: [
					        { name: 'Project tasks', value: 'project' },
					        { name: 'NPM tasks', value: 'npm' },
					        { name: 'All tasks', value: 'all' }
				        ]
			        })
			        .addQuestion({
				        config: 'taskWizard.selectedTaskName',
				        type: 'list',
				        message: 'Select project task to execute',
				        choices: getTaskChoices('project'),
				        when: function (answers) {
					        return answers['taskWizard.taskCategory'] === 'project';
				        }
			        })
			        .addQuestion({
				        config: 'taskWizard.selectedTaskName',
				        type: 'list',
				        message: 'Select NPM task to execute',
				        choices: getTaskChoices('npm'),
				        when: function (answers) {
					        return answers['taskWizard.taskCategory'] === 'npm';
				        }
			        })
			        .addQuestion({
				        config: 'taskWizard.selectedTaskName',
				        type: 'list',
				        message: 'Select a task to execute',
				        choices: getTaskChoices('all'),
				        when: function (answers) {
					        return answers['taskWizard.taskCategory'] === 'all';
				        }
			        })
			        .addQuestion({
					    config: 'taskWizard.taskArguments',
					    type: 'input',
					    message: 'Enter argument(s)',
					    when: function (answers) {
						    return answers['taskWizard.taskCategory'] !== 'project';
					    }
			        })
			        .open(['task-wizard:run-task']);
	        }

	        /**
	         * Get selected task and arguments stored in grunt config by prompt.
	         * Run selected task with these arguments.
	         */
	        function runTaskWithArguments () {
		        var command = wizard.selectedTaskName;
		        command += (wizard.taskArguments) ? ':' + wizard.taskArguments : '';
		        grunt.task.run(command);
	        }

	        if(action === 'run-task'){
		        runTaskWithArguments();
	        } else {
		        promptForTask();
	        }
        }
    );
};
