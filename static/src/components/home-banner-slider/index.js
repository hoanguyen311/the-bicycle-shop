import $ from 'jquery';
window.jQuery = $;
require('flexslider');
import Base from '~/components/Base';

class HomeBanner extends Base {
    constructor() {
        super(...arguments);
    }
    static get defaultConfig() {
        return {
            sliderConfig: {
                selector: '.home-banner-slider__inner > div',
                controlNav: true,
                directionNav: true,
                animation: 'slide',
                namespace: 'home-banner-slider__',
                prevText: '',
                nextText: ''
            }
        };
    }
    init() {
        this.$el.flexslider(this.config.sliderConfig);
    }
}

export default HomeBanner;
