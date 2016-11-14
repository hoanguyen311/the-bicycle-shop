import $ from 'jquery';
window.jQuery = $;
require('flexslider');
import Base from '~/components/Base';
import LazyImageManager from '~/utils/LazyImageManager';

class ProductSlider extends Base {
    static get defaultConfig() {
        return {
            sixProductsPerSlide: false,
            sliderConfig: {
                selector: '.product-slider__list .product-slider__item',
                controlNav: false,
                directionNav: false,
                animation: 'slide',
                namespace: 'product-slider__',
                prevText: '',
                nextText: '',
                slideshow: false,
                itemWidth: 269,
                itemMargin: 20,
                maxItems: 3,
                minItems: 1
            },
            ui: {
                $prev: 'direction-nav_prev',
                $next: 'direction-nav_next',
                $itemGroup: 'item-group',
                $items: 'item'
            }
        };
    }
    constructor() {
        super(...arguments);
        this._slider = null;
    }
    init() {
        this.$el.flexslider({
            ...this.config.sliderConfig,
            after: (slider) => this.triggerLazyLoad()
        });

        setTimeout(() => this.triggerLazyLoad(), 100);
        this.$prev.on('click', (e) => {
            this.$el.flexslider('prev');
        });

        this.$next.on('click', (e) => {
            this.$el.flexslider('next');
        });
    }
    triggerLazyLoad() {
        const { currentSlide, visible } = this.$el.data('flexslider');
        let $visibleItems = null;

        if (this.config.sixProductsPerSlide) {
            $visibleItems = this.$itemGroup.eq(currentSlide);
        } else {
            $visibleItems = this.$items.slice(
                visible * currentSlide,
                visible * currentSlide + visible
            )
        }

        Base.initComponentsOnNode($visibleItems, true);
    }
    static get blockName() {
        return 'product-slider';
    }
}

export default ProductSlider;
