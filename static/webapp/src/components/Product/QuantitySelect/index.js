import { Component, PropTypes } from 'react';
import { blockFactory } from 'rebem';

const Block = blockFactory('product-quantity-select');

class QuantitySelect extends Component {
    constructor(props) {
        super(...props);

        this.handleChangeDropdown = this.handleChangeDropdown.bind(this);
        this.handleClickButton = this.handleClickButton.bind(this);

    }
    renderQuantityOption() {
        const { stock } = this.props;
        let options = [];

        for (let i = 1; i <= stock; i++) {
            options.push(
                Block({
                    elem: 'option',
                    tag: 'option',
                    key: i
                }, i)
            );
        }

        return options;
    }
    handleChangeDropdown(e) {
        const { sku } = this.props;
        const quantity = parseFloat(e.target.value);

        this.props.handleChangeQuantity(sku, quantity);
    }
    handleClickButton(action) {
        const { sku, stock } = this.props;
        let { quantity } = this.props;

        switch (action) {
            case 'up':
                quantity++;
                break;
            case 'down':
                quantity--;
                break;
            default:
        }

        if (action === 'up' && parseFloat(quantity) > stock) {
            return;
        }
        if (action === 'down' && parseFloat(quantity) < 1) {
            return;
        }

        this.props.handleChangeQuantity(sku, parseFloat(quantity));
    }
    render() {
        const { stock, quantity, isBlocked } = this.props;

        const maxQuantity = stock;
        const minQuantity = 1;

        return Block(
            {
                mods: {
                    'is-blocked': isBlocked
                }
            },
            Block({
                elem: 'button',
                mods: {
                    act: 'down',
                    disabled: quantity === minQuantity
                },
                tag: 'span',
                onClick: () => {
                    this.handleClickButton('down');
                }
            }, ''),
            Block({
                elem: 'dropdown',
                tag: 'select',
                value: quantity,
                onChange: this.handleChangeDropdown
            }, this.renderQuantityOption()),
            Block({
                elem: 'button',
                mods: {
                    act: 'up',
                    disabled: quantity === maxQuantity
                },
                tag: 'span',
                onClick: () => {
                    this.handleClickButton('up');
                }
            }, '')
        );
    }
}

QuantitySelect.defaultProps = {
    stock: 0,
    quantity: -1
};

QuantitySelect.propTypes = {
    stock: PropTypes.number,
    quantity: PropTypes.number,
    handleChangeQuantity: PropTypes.func.isRequired
};

QuantitySelect.className = 'QuantitySelect';
export default QuantitySelect;
