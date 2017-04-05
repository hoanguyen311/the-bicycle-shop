import { connect } from 'react-redux';
import OrderSummary from '#OrderSummary';
import { getTotal } from '~/selectors/orderSummary';

function mapStateToProps(state) {
    return {
        total: getTotal(state)
    };
}

export default connect(
    mapStateToProps,
    null
)(OrderSummary);
