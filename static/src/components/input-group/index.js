import Base from '~/components/Base';

class InputGroup extends Base {
    static get defaultConfig() {
        return {
            ui: {
                $control: 'control',
                $clearText: 'clear-text'
            }
        };
    }
    constructor() {

        super(...arguments);

    }
    init() {
        this.$clearText.on('click', (e) => {
            this.$control.val('');
        });
    }
    static get blockName() {
        return 'l-input-group';
    }
}

export default InputGroup;
