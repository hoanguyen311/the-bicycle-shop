import $ from 'jquery';
import EventEmitter from 'events';
import BemUtils from '~/utils/BEM';

const _COMPONENT_LAZY_INIT_ATTR = 'js-component-lazy-init';
const _COMPONENT_NAME_ATTR = 'js-component';
const _COMPONENT_PARAMS_ATTR = 'js-component-params';

class Base extends EventEmitter {
    constructor($el, options) {
        super();
        this.$el = $el;
        this.config = $.extend(true, {}, this.constructor.defaultConfig, options);

        if (this.config.ui && Object.keys(this.config.ui).length > 0) {
            this.bindUiElement();
        }
        this.init();

        this.$el
            //.removeAttr(`data-${_COMPONENT_NAME_ATTR} data-${_COMPONENT_PARAMS_ATTR} data-${_COMPONENT_LAZY_INIT_ATTR}`)
            .attr('data-js-inited', true);
        this.$el.trigger('component:init');
    }
    bindUiElement() {
        for (const uiKey in this.config.ui) {
            if (this.config.ui.hasOwnProperty(uiKey)) {
                this[uiKey] = this.getElement(this.config.ui[uiKey]);
            }
        }
    }
    static getComponentOnNode($node, componentName) {
        const component = $node.data(componentName);
        const assignedComponentName = $node.data(_COMPONENT_NAME_ATTR);

        if (component &&
            component.constructor.blockName === componentName &&
            component instanceof Base &&
            assignedComponentName === componentName) {
            return component;
        }

        return false;
    }
    collectComponents(type = Base, $root = this.$el) {
        const children = this.$el.find('*').toArray();

        return children.map((el) => Base.getComponentOnNode($(el), type.blockName))
            .filter((comp) => comp instanceof type);
    }
    static initComponentsOnNode(root, forced) {
        const $root = $(root);
        const componentName = $root.data(_COMPONENT_NAME_ATTR);

        if (!forced && $root.data(_COMPONENT_LAZY_INIT_ATTR)) {
            return;
        }

        if (componentName) {
            this.initComponent($root, componentName);
        }

        this.initChildren($root, forced);
    }
    static initComponent($el, componentName) {
        const componentParams = $el.data(_COMPONENT_PARAMS_ATTR);
        let params = {};

        if (window.__components__[componentName]) {
            if (typeof componentParams === 'string') {
                try {
                    params = (new Function(`return ${componentParams.replace(/\n/g, '')};`)).call(null);
                } catch(e) {
                    console.warn(`Can not parse componentParams`, e.message);
                    params = {};
                }
            }
            $el.data(componentName , new window.__components__[componentName]($el, params));
            this._length += 1;
        }
    }
    static initChildren($root, forced) {
        this.getClosestChildren($root)
        .each((i, el) => {
            this.initComponentsOnNode(el, forced);
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
    static get blockName() {
        console.warn(`Please implement static get blockName in component's class ${this.name}`);
        return 'Unknown';
    }
    addMod(modName, modValue) {
        const modClass = BemUtils.buildModClass(this.constructor.blockName, ...arguments);

        this.$el.addClass(modClass);
    }
    removeMod(modName, modValue) {
        const modClassName = [];

        if (modValue === true) {
            BemUtils.parseEl(this.$el).blMods.forEach(mod => {
                if (mod.modName === name) {
                    modClassName.push(mod.className);
                }
            });
        } else {
            modClassName.push(BemUtils.buildModClass(this.constructor.blockName, ...arguments));
        }

        this.$el.removeClass(modClassName.join(' '));
    }
    hasMod(name, value) {
        const modClassName = BemUtils.buildModName(this.constructor.blockName, ...arguments);

        return this.$root.hasClass(modClassName);
    }
    getElement(name) {
        const elementClass = BemUtils.buildElementClass(this.constructor.blockName, name);
        return $(`.${elementClass}`, this.$el);
    }
    trigger(eventName, ...params) {
        this.emit(eventName, ...params);
    }
    init() {
        throw new Error(`Please implement init method for component [${this.constructor.name}]`);
    }
}



export default Base;
