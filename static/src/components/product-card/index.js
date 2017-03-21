import Base from '~/components/Base';
import TypeSwitcher from '~/components/type-switcher';

class ProductCard extends Base {
    init() {
        const { typeSwitcher } = this.config;

        if (typeSwitcher) {
            typeSwitcher.on('changeType', (type) => this.switchType(type));
        }
    }
    switchType(type) {
        this.removeMod('type', TypeSwitcher.getOtherType(type));
        this.addMod('type', type);
    }
    static get blockName() {
        return 'product-card';
    }
}


export default ProductCard;
