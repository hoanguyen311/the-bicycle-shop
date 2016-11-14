import $ from 'jquery';
window.jQuery = $;
require('flexslider');

import Base from '~/components/Base';

class InputGroup extends Base {
    static get defaultConfig() {
        return {
            ui: {
                $mainSlider: 'main',
                $carousel: 'carousel',
                $carouselNav: 'carousel-item',
                $carouselList: 'carousel-list'
            }
        };
    }
    init() {
        this.$carousel.flexslider({
            animation: 'slide',
            selector: '.product-image__carousel-list > .product-image__carousel-item',
            controlNav: false,
            animationLoop: false,
            slideshow: false,
            namespace: 'product-image__carousel-',
            itemWidth: 70,
            itemMargin: 30,
            animationSpeed: 250,
            maxItems: 3,
            prevText: '',
            nextText: '',
            asNavFor: this.$mainSlider
        });

        this.$mainSlider.flexslider({
            animation: "slide",
            selector: '.product-image__main-list > .product-image__main-item',
            animationSpeed: 250,
            controlNav: false,
            animationLoop: false,
            slideshow: false,
            directionNav: false,
            sync: this.$carousel
        });

        this.$carouselNav.on('mouseover', () => {
            console.log(this.$carouselNav.index($(this)))
        })

    }
    static get blockName() {
        return 'product-image';
    }
}

export default InputGroup;
