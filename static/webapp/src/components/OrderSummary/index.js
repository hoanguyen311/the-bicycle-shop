import { PropTypes } from 'react';
import { blockFactory } from 'rebem';
import Button from '#Button';

const Block = blockFactory('order-summary');

const renderTotal = (total) => {

    return Block({
        elem: 'total'
    }, Block({
        elem: 'total-label',
        tag: 'label'
    }, 'Tổng cộng:'),
    Block({
        elem: 'total-value'
    }, total));
};

const renderButton = () => Block({
    elem: 'footer'
}, Button({
    text: 'Tiến hành thanh toán',
    tag: 'a',
    href: '/checkout',
    mods: {
        expand: true
    }
}));


const OrderSummary = (props) => {
    const { total } = props;

    return Block(
        null,
        renderTotal(total),
        renderButton()
    );
};

OrderSummary.displayName = 'OrderSummary';

OrderSummary.defaultProps = {
    total: ''
};

OrderSummary.propTypes = {
    total: PropTypes.string
};

export default OrderSummary;
