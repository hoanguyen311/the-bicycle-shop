import $ from 'jquery';
import debounce from 'lodash/debounce';
const $window = $(window);

class LazyLoadManager {
    constructor() {
        this.imgs = [];
        this.updateWindowSize();
        $window.on('resize', debounce(() => this.updateWindowSize(), 100));
        $window.on('scroll resize', debounce(() => this.update(), 200));
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

module.exports = new LazyLoadManager();
