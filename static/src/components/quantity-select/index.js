import Base from '~/components/Base';
import BEM from '~/utils/BEM';

class QuantitySelect extends Base {
    static get defaultConfig() {
        return {
            ui: {
                $control: 'control',
                $down: 'button_down',
                $up: 'button_up'
            }
        };
    }
    init() {
        this.buttonDisabledClass = this.getDisableClass();
        this.$down.on('click', (e) => {
            e.preventDefault();
            this.onClickDown();
        });

        this.$up.on('click', (e) => {
            e.preventDefault();
            this.onClickUp();
        });

        this.checkToDisableControls();
        this.$control.on('change', (e) => this.checkToDisableControls());
    }
    getDisableClass() {
        return BEM.buildModClass(
            BEM.buildElementClass(this.constructor.blockName, 'button'),
            'disabled', true
        );
    }
    onClickDown() {
        const $prevOption = this.$control.find(`option:selected`).prev();

        if ($prevOption.length) {
            this.$control.val($prevOption.attr('value'));
        }

        this.checkToDisableControls();
    }
    onClickUp() {
        const $nextOption = this.$control.find('option:selected').next();

        if ($nextOption.length) {
            this.$control.val($nextOption.attr('value'));
        }

        this.checkToDisableControls();
    }
    checkToDisableControls() {
        const $options = this.$control.find('option');
        const $currentOption = $options.filter(':selected');
        const $lastOption = $options.last();
        const $firstOption = $options.first();

        if ($currentOption.is($lastOption)) {
            this.$up.addClass(this.buttonDisabledClass);
        } else {
            this.$up.removeClass(this.buttonDisabledClass);
        }

        if ($currentOption.is($firstOption)) {
            this.$down.addClass(this.buttonDisabledClass);
        } else {
            this.$down.removeClass(this.buttonDisabledClass);
        }
    }
    static get blockName() {
        return 'quantity-select';
    }
}

export default QuantitySelect;
