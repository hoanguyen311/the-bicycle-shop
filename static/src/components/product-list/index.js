import $ from 'jquery';
import Base from '~/components/Base';
import TypeSwitcher from '~/components/type-switcher';
import ProductCard from '~/components/product-card';

class ProductList extends Base {
    static get defaultConfig() {
        return {
            ui: {
                $list: 'list'
            }
        };
    }
    init() {
        const switcher = new TypeSwitcher($('.type-switcher', this.$el));

        switcher.on('changeType', (type) => this.switchType(type));
        Base.initComponentsOnNode(this.$list, true);

        this.collectComponents(ProductCard, this.$list).forEach((productCard) => {
            switcher.on('changeType', (type) => productCard.switchType(type));
        });
    }
    switchType(type) {
        this.removeMod('type', TypeSwitcher.getOtherType(type));
        this.addMod('type', type);
    }
    static get blockName() {
        return 'product-list';
    }
}


export default ProductList;
