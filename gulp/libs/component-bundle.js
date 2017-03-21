'use strict';

const ComponentFinder = require('./component-finder');
const path = require('path');
const merge = require('merge2');

module.exports =
    class ComponentBundle {
        constructor(config) {
            this.config = config;
        }
        getStream(type) {
            const componentsRoot = this.config.componentsRoot;
            const tasks = [];
            let finder = null;

            for (const page in componentsRoot) {
                if (componentsRoot.hasOwnProperty(page)) {
                    finder = new ComponentFinder({
                        indexFile: path.resolve(this.config.viewPath, componentsRoot[page]),
                        viewPath: this.config.viewPath
                    });

                    const list = type === 'styles' ?
                        finder.getList() : finder.getJsComponents();

                    tasks.push(
                        this.getTask(page, list)
                    );
                }
            }

            return merge(tasks);
        }
        getTask(page, list) {
            throw new Error('getTask should be implemented on sub classes');
        }
    };
