"use strict";
const fs = require('fs');
const path = require('path');
const uniq = require('lodash').uniq;
const gutil = require('gulp-util');

module.exports =
    class ComponentsFinder {
        constructor(config) {
            this._list = [];
            this._jsComponentsList = [];
            this._cache = {};
            this.config = config;
        }

        static parse(str) {
            const output = [];
            const regex = /("|')([^"]+\.twig)(\1)/g;
            let matches = null;

            while ((matches = regex.exec(str)) !== null) {
                output.push(RegExp.$2);
            }

            return output;
        }

        getList() {
            this.find(this.config.indexFile);
            return uniq(
                this._list
                    .filter((filePath) => /\/components\//g.test(filePath))
                    .map((filePath) => path.basename(filePath, '.twig'))
            );
        }

        getJsComponents() {
            this.findJsComponent(this.config.indexFile);

            return uniq(this._jsComponentsList);
        }

        parseJsComponents(content) {
            const output = [];
            const regex = /data-js-component=(\"|\')([^"]+)\1/g;
            let matches = null;

            while ((matches = regex.exec(content)) !== null) {
                output.push(RegExp.$2);
            }

            return output;
        }

        findJsComponent(filePath) {
            if (this._cache[filePath]) {
                return;
            }

            try {
                const content = fs.readFileSync(filePath, 'UTF-8');

                this._cache[filePath] = true;

                this._jsComponentsList = [
                    ...this._jsComponentsList,
                    ...this.parseJsComponents(content)
                ];

                ComponentsFinder
                    .parse(content)
                    .map((component) => path.resolve(this.config.viewPath, component))
                    .forEach((componentPath) => this.findJsComponent(componentPath));

            } catch (e) {
                gutil.log(gutil.colors.red(`(!) WARNING: ${e.message}`), `file path: ${filePath}`);
            }
        }

        find(filePath) {

            if (this._cache[filePath]) {
                return;
            }

            try {

                const content = fs.readFileSync(filePath, 'UTF-8');
                this._cache[filePath] = true;

                this._list = [
                    ...this._list,
                    ...[ filePath ]
                ];



                ComponentsFinder
                    .parse(content)
                    .map((component) => path.resolve(this.config.viewPath, component))
                    .forEach((componentPath) => this.find(componentPath));

            } catch (e) {
                console.log(`(!) WARNING: ${e.message}`);
            }
        }
    };
