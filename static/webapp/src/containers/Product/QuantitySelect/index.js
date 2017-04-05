import { connect } from 'react-redux';
import ProductQuantitySelect from '#Product/QuantitySelect';
import { requestUpdateQuantity } from '~/actions/products';

function mapDispatchToProps(dispatch) {
    return {
        handleChangeQuantity(sku, quantity) {
            dispatch(requestUpdateQuantity({ sku, quantity }));
        }
    };
}
export default connect(
    null,
    mapDispatchToProps
)(ProductQuantitySelect);
