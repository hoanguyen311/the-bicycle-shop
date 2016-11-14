import Base from '~/components/Base';
import BEM from '~/utils/BEM';

class Tab extends Base {
    static get defaultConfig() {
        return {
            ui: {
                $navItem: 'nav-item',
                $contentItem: 'content-item'
            }
        };
    }
    constructor() {
        super(...arguments);
    }
    init() {
        this.$navItem.on('click', (e) => {
            this.showTabByIndex(
                this.$navItem.index(e.currentTarget)
            );
        });
    }
    showTabByIndex(index) {
        const navActiveClass = BEM.buildModClass(
            BEM.buildElementClass(this.constructor.blockName, 'nav-item'),
            'active',
            true
        );

        const contentActiveClass = BEM.buildModClass(
            BEM.buildElementClass(this.constructor.blockName, 'content-item'),
            'active',
            true
        );

        this.$navItem
            .removeClass(navActiveClass)
            .eq(index)
            .addClass(navActiveClass);

        this.$contentItem
            .removeClass(contentActiveClass)
            .eq(index)
            .addClass(contentActiveClass);
    }
    static get blockName() {
        return 'tab';
    }
}

export default Tab;
