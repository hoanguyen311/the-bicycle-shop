import { connect } from 'react-redux';
import CartProducts from '#CartProducts';
import { requestRemoveItem } from '~/actions/products';
import { getAllProducts } from '~/reducers/products';

function mapStateToProps(state) {
    return {
        items: getAllProducts(state.products)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        handleRemoveItem(sku) {
            dispatch(requestRemoveItem({ sku }));
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CartProducts);
