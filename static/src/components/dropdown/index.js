import $ from 'jquery';
import Base from '~/components/Base';
import BEM from '~/utils/BEM';

const $document = $(document);

class Dropdown extends Base {
    init() {
        this.els = this.getEls();
        this._isShowing = false;
        this.els.$title.on('click', () => this.toggle());
        if (this.config.closeOnClickOutSide) {
            $document.on('click', (e) => {
                this.onClickOutside(e);
            });
        }
    }
    onClickOutside(e, toggleHandler) {
        if ($.contains(this.$el.get(0), e.target) || !this._isShowing) {
            return;
        }

        this.hide();
    }
    toggle() {
        if (this._isShowing) {
            this.hide();
        } else {
            this.show();
        }
    }
    show() {
        this.addMod('active');
        this._isShowing = true;

        if (this.config.flexibleWidth) {
            this.adjustWidth();
        }
    }
    hide() {
        this.removeMod('active');
        this._isShowing = false;

        if (this.config.flexibleWidth) {
            this.$el.removeAttr('style');
        }
    }
    adjustWidth() {
        const elWidth = this.$el.outerWidth();
        const contentWidth = this.els.$content.outerWidth();

        this.$el.width(Math.max(elWidth, contentWidth));
    }
    getEls() {
        return {
            $title: this.getElement('title'),
            $content: this.getElement('content')
        };
    }
    static get blockName() {
        return 'dropdown';
    }
}

export default Dropdown;
