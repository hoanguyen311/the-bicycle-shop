import $ from 'jquery';
import debounce from 'lodash/debounce';
const $window = $(window);

class LazyLoadManager {
    constructor() {
        this.imgs = [];
        this.update = debounce(this.update.bind(this), 10);
        $window.on('resize', this.updateWindowSize.bind(this));
        this.updateWindowSize();
        console.log('init', this.windowSize);
        $window.on('scroll resize', this.update);
    }

    updateWindowSize() {
        this.windowSize = {
            height: $window.height(),
            width: $window.width()
        };
    }

    register(img) {
        this.imgs.push(img);
    }

    update() {
        this.imgs = this.imgs.filter((img) => {
            return !img.isLoaded;
        });
        this.imgs.forEach((img) => {
            img.update();
        });
    }
}

module.exports = new LazyLoadManager;
