import { connect } from 'react-redux';
import App from '#App';
import { requestData } from '~/actions/app';
import { isProductsEmpty } from '~/selectors/products';

function mapStateToProps(state) {
    return {
        loading: state.app.loading,
        isEmpty: isProductsEmpty(state)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadData() {
            dispatch(requestData());
        }
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
