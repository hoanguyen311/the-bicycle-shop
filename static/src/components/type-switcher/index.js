import $ from 'jquery';
import Base from '~/components/Base';
import BEM from '~/utils/BEM';

class TypeSwitcher extends Base {
    static get defaultConfig() {
        return {
            ui: {
                $item: 'item'
            },
            itemActiveClass: BEM.buildModClass('type-switcher__item', 'active')
        };
    }
    init() {
        this.$item.on('click', (e) => this.switchType(e));
    }
    switchType(e) {
        const { itemActiveClass } = this.config;
        const $current = $(e.currentTarget);
        const type = $current.data('type');

        this.$item.removeClass(itemActiveClass);
        $current.addClass(itemActiveClass);
        this.emit('changeType', type);
    }
    static get blockName() {
        return 'type-switcher';
    }
    static getOtherType(type) {
        return type === 'list' ? 'grid' : 'list';
    }
}

export default TypeSwitcher;
