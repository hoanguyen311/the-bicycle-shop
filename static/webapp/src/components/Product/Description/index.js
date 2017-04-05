import { blockFactory } from 'rebem';
import { PropTypes } from 'react';

const Block = blockFactory('product-description');

function ProductDescription(props) {
    const { name, brand, stock, quantity } = props;

    return Block(
        null,
        Block({
            elem: 'name',
            tag: 'h3'
        }, name),
        brand && Block({
            elem: 'brand',
            tag: 'p'
        }, `Thương hiệu: ${brand}`),
        Block({
            elem: 'stock-status',
            tag: 'p'
        }, `Còn ${stock - quantity} sản phẩm`)
    );
}

ProductDescription.displayName = 'ProductDescription';
ProductDescription.propTypes = {
    name: PropTypes.string,
    brand: PropTypes.string,
    stock: PropTypes.number,
    quantity: PropTypes.number
};
export default ProductDescription;
