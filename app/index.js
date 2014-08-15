'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var VoorhoedeFrontEndGuideGenerator = yeoman.generators.Base.extend({
    init: function () {
        this.pkg = require('../package.json');

        this.on('end', function () {
            if (!this.options['skip-install']) {
                this.installDependencies();
            }
        });

    },

    askFor: function () {
        var done = this.async();
        var generator = this;

        // Have Yeoman greet the user.
        this.log(yosay('Welcome to the marvelous VoorhoedeFrontEndGuide generator!'));

        var prompts = [{
            name: 'appName',
            message: 'What is your app\'s name?'
        }
//            ,{
//            type: 'confirm',
//            name: 'someOption',
//            message: 'Would you like to have package and bower?',
//            default: true
//        }
            ,{
                type: 'confirm',
                name: 'vhost',
                message: 'Would you like to generate a vhost example file?',
                default: true
            }
//            ,{
//                when: function (response) {
//                    return response.vhost;
//                },
//                name: 'development-server-name',
//                message: 'In your vhost example, what should be the development server name? (e.g \' local.my-project.voorhoede.nl\')'
//            }
            ,{
                type: 'list',
                name: 'cssPreprocessor',
                message: 'Would you like to use a css preprocessor?',
                choices: [{
                    name: 'Sass, please!',
                    value: 'sass'
                }, {
                    name: 'Sass with Compass, please!',
                    value: 'sass-compass'
                }, {
                    name: 'Less, please!',
                    value: 'less'
                }, {
                    name: 'F that, I will use pure css!',
                    value: 'pure'
                }]
            }

        ];

        this.prompt(prompts, function (props) {
            this.appName = props.appName;
            this.vhost = props.vhost;
            this.cssPreprocessor = props.cssPreprocessor;


            this.someOption = props.someOption;

            this.app();
            this.projectfiles();

            done();
        }.bind(generator));
    },

    app: function () {
        // set variables to context
        var context = {
            site_name: this.appName,
            cwd: process.cwd(),
            cssPreprocessor: this.cssPreprocessor
        };

        // make base dir
        this.mkdir('source');

        // make assets scaffold
        this.mkdir('source/assets');
        this.mkdir('source/assets/images');
//        if (this.grunticon) {
//          this.mkdir('source/assets/grunticon-svgs');
//        }
        this.mkdir('source/assets/scripts');
        this.copy('source/assets/_scripts.json', 'source/assets/scripts.json');

        // make modules scaffold
        this.mkdir('source/modules');
        this.mkdir('source/modules/components');
        this.mkdir('source/modules/views');
        this.copy('source/modules/_index.json', 'source/modules/index.json');

        // make vendor scaffold
        this.mkdir('source/vendor');

        // make tasks structure
        this.mkdir('tasks');
        this.mkdir('tasks/grunt');
        this.mkdir('tasks/grunt/configuration');
        this.mkdir('tasks/grunt/tasks');
        this.mkdir('tasks/grunt/templates');
        this.mkdir('tasks/grunt/utilities');
        // TODO: phing folder, java folder

        // setup grunt configuration
        this.copy('tasks/grunt/configuration/_bump.js', 'tasks/grunt/configuration/bump.js');
        this.copy('tasks/grunt/configuration/_clean.js', 'tasks/grunt/configuration/clean.js');
        this.copy('tasks/grunt/configuration/_compress.js', 'tasks/grunt/configuration/compress.js');
        this.copy('tasks/grunt/configuration/_concat.js', 'tasks/grunt/configuration/concat.js');
        this.copy('tasks/grunt/configuration/_connect.js', 'tasks/grunt/configuration/connect.js');
        this.copy('tasks/grunt/configuration/_connect.js', 'tasks/grunt/configuration/connect.js');
        this.copy('tasks/grunt/configuration/_copy.js', 'tasks/grunt/configuration/copy.js');
        this.copy('tasks/grunt/configuration/_csslint.js', 'tasks/grunt/configuration/csslint.js');
        this.template("tasks/grunt/configuration/_cssmin.js", "tasks/grunt/configuration/cssmin.js", context);
//        if (this.grunticon) {
//          this.copy('tasks/grunt/configuration/_grunticon.js', 'tasks/grunt/configuration/grunticon.js');
//        }
        this.copy('tasks/grunt/configuration/_index.js', 'tasks/grunt/configuration/index.js');
        this.copy('tasks/grunt/configuration/_jsbeautifier.js', 'tasks/grunt/configuration/jsbeautifier.js');
        this.copy('tasks/grunt/configuration/_jshint.js', 'tasks/grunt/configuration/jshint.js');
        this.copy('tasks/grunt/configuration/_prompt.js', 'tasks/grunt/configuration/prompt.js');
        this.copy('tasks/grunt/configuration/_prompt.js', 'tasks/grunt/configuration/prompt.js');
        if (this.cssPreprocessor === 'sass' || this.cssPreprocessor === 'sass-compass') {
            this.copy('tasks/grunt/configuration/_sass.js', 'tasks/grunt/configuration/sass.js');
        }
//        if (this.svgMinification) {
//            this.copy('tasks/grunt/configuration/_svgmin.js', 'tasks/grunt/configuration/svgmin.js');
//        }
        this.copy('tasks/grunt/configuration/_uglify.js', 'tasks/grunt/configuration/uglify.js');
        this.copy('tasks/grunt/configuration/_watch.js', 'tasks/grunt/configuration/watch.js');



        // setup grunt tasks
        this.copy('tasks/grunt/tasks/_compile-html.js', 'tasks/grunt/tasks/compile-html.js');
        this.copy('tasks/grunt/tasks/_compile-index.js', 'tasks/grunt/tasks/compile-index.js');
        this.copy('tasks/grunt/tasks/_compile-preview-object.js', 'tasks/grunt/tasks/compile-preview-object.js');
        this.copy('tasks/grunt/tasks/_compile-previews.js', 'tasks/grunt/tasks/compile-previews.js');
        this.copy('tasks/grunt/tasks/_create-component.js', 'tasks/grunt/tasks/create-component.js');
        this.copy('tasks/grunt/tasks/_create-task.js', 'tasks/grunt/tasks/create-task.js');
        this.copy('tasks/grunt/tasks/_create-task-configuration.js', 'tasks/grunt/tasks/create-task-configuration.js');
        this.copy('tasks/grunt/tasks/_create-view.js', 'tasks/grunt/tasks/create-view.js');
        this.template("tasks/grunt/tasks/_deploy.js", "tasks/grunt/tasks/deploy.js", context);
        this.template("tasks/grunt/tasks/_develop.js", "tasks/grunt/tasks/develop.js", context);
        this.template("tasks/grunt/tasks/_develop-server.js", "tasks/grunt/tasks/develop-server.js", context);
//        if (this.karma) {
//          this.copy('tasks/grunt/tasks/_karma.js', 'tasks/grunt/tasks/karma.js');
//        }
        this.copy('tasks/grunt/tasks/_list-modules.js', 'tasks/grunt/tasks/list-modules.js');
        this.copy('tasks/grunt/tasks/_list-tasks.js', 'tasks/grunt/tasks/list-tasks.js');
        this.copy('tasks/grunt/tasks/_remove-component.js', 'tasks/grunt/tasks/remove-component.js');
        this.copy('tasks/grunt/tasks/_remove-view.js', 'tasks/grunt/tasks/remove-view.js');
        if (this.cssPreprocessor === 'sass' || this.cssPreprocessor === 'sass-compass') {
            this.copy('tasks/grunt/tasks/_sass-and-lint.js', 'tasks/grunt/tasks/sass-and-lint.js');
        }
        this.copy('tasks/grunt/tasks/_task-wizard.js', 'tasks/grunt/tasks/task-wizard.js');

        // make Gruntfile
        this.template("_Gruntfile.js", "Gruntfile.js", context);





        if (this.vhost) {
            this.template("_vhost-template.vhost", "source/" + context.site_name + ".vhost", context);
        }

        // handle css preprocessors
        if (this.cssPreprocessor === 'sass' ) {
            this.mkdir('source/assets/scss');
        } else if (this.cssPreprocessor === 'sass-compass') {
            this.mkdir('source/assets/scss');
        } else if (this.cssPreprocessor === 'less') {
            this.mkdir('source/assets/less');
        } else {
            // plain css
            this.mkdir('source/assets/css');
        }

        this.template('_package.json', 'package.json', context);

    },

    projectfiles: function () {
        this.copy('editorconfig', '.editorconfig');
        this.copy('jshintrc', '.jshintrc');
    }
});

module.exports = VoorhoedeFrontEndGuideGenerator;
