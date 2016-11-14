import Base from '~/components/Base';
import LazyImageManager from '~/utils/LazyImageManager';
import $ from 'jquery';

class ImageLazy extends Base {
    static get defaultConfig() {
        return {
            isBackgroundImage: false,
            ui: {
                $img: 'img',
                $backgroundImg: 'background-img'
            }
        };
    }

    init() {
        this.isLoaded = false;
        LazyImageManager.register(this);
        this.update();
    }
    update() {
        if (this.isLoaded) {
            return;
        }
        if (this.isVisible()) {
            this.load()
                .then(() => this.show())
                .catch((err) => this.showError(err))
        }
    }

    load() {
        return new Promise((resolve, reject) => {
            $('<img />')
                .on('load', resolve)
                .attr('src', `${this.config.src}?_=${new Date().getTime()}`)
        });
    }
    showError(err) {
        console.warn(err);
    }
    show() {
        this.isLoaded = true;

        if (this.config.isBackgroundImage) {
            this.$backgroundImg.attr('style', `background-image: url(${src})`);
        } else {
            this.$img.attr('src', this.config.src)
        }
        setTimeout(() => {
            this.addMod('loaded', true);
        }, 20);

    }
    isVisible(hidden, partial = true) {
        const t = this.$el.get(0);
        const vpWidth = LazyImageManager.windowSize.width;
        const vpHeight = LazyImageManager.windowSize.height;
        const clientSize = hidden === true ? t.offsetWidth * t.offsetHeight : true;

        const rec = t.getBoundingClientRect();
        const tViz = rec.top >= 0 && rec.top < vpHeight;
        const bViz = rec.bottom > 0 && rec.bottom <= vpHeight;
        const lViz = rec.left >= 0 && rec.left < vpWidth;
        const rViz = rec.right > 0 && rec.right <= vpWidth;
        const vVisible = partial ? tViz || bViz : tViz && bViz;
        const hVisible = partial ? lViz || rViz : lViz && rViz;

        return clientSize && vVisible && hVisible;
    }
    static get blockName() {
        return 'image-lazy';
    }
}

export default ImageLazy;
