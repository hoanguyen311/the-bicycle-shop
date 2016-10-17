import $ from 'jquery';
import EventEmitter from 'events';

class Base extends EventEmitter {
    constructor($el, options) {
        super();
        this.$el = $el;
        this.config = $.extend(true, {}, this.constructor.defaultConfig, options);
        this.$el.removeAttr(`data-${_COMPONENT_NAME_ATTR} data-${_COMPONENT_PARAMS_ATTR}`);
        this.init();
    }
    static initComponentsOnNode(root) {
        const $root = $(root);
        const componentName = $root.data(_COMPONENT_NAME_ATTR);
        const componentParams = $root.data(_COMPONENT_PARAMS_ATTR);
        let params = {};


        if (componentName && window.__components__[componentName]) {
            if (typeof componentParams === 'string') {
                try {
                    params = JSON.parse(componentParams);
                } catch(e) {
                    params = {};
                }
            }
            $root.data(componentName , new window.__components__[componentName]($root, params));
            this._length += 1;
        }

        this.getClosestChildren($root)
        .each((i, el) => {
            this.initComponentsOnNode(el);
        });
    }
    static getClosestChildren($root) {
        const componentSelector = `[data-${_COMPONENT_NAME_ATTR}]`;
        let $children = $root.children();
        let $found = $();

        while ($children.length) {
            $found = $found.add($children.filter(componentSelector));
            $children = $children.not(componentSelector).children();
        }

        return $found;
    }
    static get defaultConfig() {
        return {};
    }
    static getComponentName() {
        return 'Base';
    }
    trigger(eventName, ...params) {
        this.emit(eventName, ...params);
    }
    init() {
        throw new Error(`Please implement init method for component ${this.constructor.componentName()}`);
    }
}

const _COMPONENT_NAME_ATTR = 'js-component';
const _COMPONENT_PARAMS_ATTR = 'js-component-params';

export default Base;
