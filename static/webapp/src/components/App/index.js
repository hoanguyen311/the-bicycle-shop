import { Component, createFactory, PropTypes } from 'react';
import { blockFactory } from 'rebem';

import OrderSummary from '#OrderSummary';
import CartProducts from '#CartProducts';


const Block = blockFactory('cart-page');

class App extends Component {
    constructor(props) {
        super(...props);
    }
    static displayName = 'App'
    static propTypes = {
        loading: PropTypes.bool.isRequired,
        isEmpty: PropTypes.bool
    }
    static defaultProps = {
        loading: false,
        isEmpty: true
    }
    componentDidMount() {
        this.props.loadData();
    }
    renderProducts() {
        return Block({
            elem: 'products'
        }, CartProducts());
    }
    renderSummaryBlock() {
        return Block({
            elem: 'order-summary'
        }, OrderSummary());
    }
    render() {
        const { loading, isEmpty } = this.props;

        if (isEmpty && !loading) {
            return Block({
                mods: {
                    'is-empty': true
                }
            }, Block({
                elem: 'empty-text'
            }, 'Không có sản phẩm nào trong giỏ hàng'))
        }

        if (loading) {
            return Block(null, 'Đang tải...')
        }

        return Block(null,
            Block({
                elem: 'body',
                tag: 'main'
            }, this.renderProducts(), this.renderSummaryBlock())
        );
    }
}
export default App;
