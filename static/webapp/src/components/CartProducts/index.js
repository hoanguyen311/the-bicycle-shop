import { Component, PropTypes } from 'react';
import { blockFactory } from 'rebem';
import ProductDescription from '#Product/Description';
import ProductImage from '#Product/Image';
import ProductQuantity from '#Product/QuantitySelect';
import ProductPrice from '#Product/Price';

const Block = blockFactory('cart-products');

class CartProducts extends Component {

    renderHeadColumns() {
        const { items } = this.props;

        return [
            Block({
                mods: { order: '1st' },
                elem: 'head-col',
                tag: 'th'
            }, `${items.length} Sản phẩm`),
            Block({
                mods: { order: '2nd' },
                elem: 'head-col',
                tag: 'th'
            }, ' '),
            Block({
                mods: { order: '3rd' },
                elem: 'head-col',
                tag: 'th'
            }, 'Giá tiền'),
            Block({
                mods: { order: '4th' },
                elem: 'head-col',
                tag: 'th'
            }, 'Số lượng'),
            Block({
                mods: { order: '5th' },
                elem: 'head-col',
                tag: 'th'
            }, ' ')
        ];
    }

    renderHeader() {
        return Block({
            elem: 'header',
            tag: 'thead'
        }, Block({
            elem: 'row',
            tag: 'tr',
            mods: {
                head: true
            }
        }, ...this.renderHeadColumns()));
    }
    renderBody() {
        return Block({
            elem: 'tbody',
            tag: 'tbody'
        }, ...this.renderItems());
    }
    renderItems() {
        const { items } = this.props;

        return [
            this.renderSpacer(-1),
            ...items.reduce((rows, product, i) => {
                return [
                    ...rows,
                    Block({
                        elem: 'item',
                        tag: 'tr',
                        key: product.sku
                    }, ...this.renderItem(product)),
                    this.renderSpacer(i)
                ];
            }, [])
        ];
    }

    renderSpacer(index) {
        return Block({
            elem: 'item',
            mods: { spacer: true },
            tag: 'tr',
            key: `spacer-${index}`
        }, Block({
            tag: 'td',
            elem: 'col',
            colSpan: 5,
            mods: { spacer: true }
        }));
    }

    renderItem(product) {
        const {
            link,
            image,
            name,
            stockStatus,
            price,
            oldPrice,
            sale,
            stock,
            quantity,
            sku,
            brand,
            isBlocked
        } = product;

        return [
            Block({
                mods: { order: '1st' },
                elem: 'col',
                tag: 'td'
            }, ProductImage({ link, image, name })),
            Block(
                {
                    mods: { order: '2nd' },
                    elem: 'col',
                    tag: 'td'
                },
                ProductDescription({ name, stockStatus, brand, stock, quantity })
            ),
            Block({
                mods: { order: '3rd' },
                elem: 'col',
                tag: 'td'
            }, ProductPrice({ price, oldPrice, sale })),
            Block({
                mods: {
                    order: '4th'
                },
                elem: 'col',
                tag: 'td'
            }, ProductQuantity({ stock, quantity, sku, isBlocked })),
            Block({
                mods: { order: '5th' },
                elem: 'col',
                tag: 'td'
            }, Block({
                tag: 'span',
                elem: 'remove-item',
                mods: {
                    'is-blocked': isBlocked
                },
                onClick: () => {
                    if (!isBlocked) {
                        this.props.handleRemoveItem(sku);
                    }
                }
            }))
        ];
    }
    render() {
        return Block(
            {
                tag: 'table'
            },
            this.renderHeader(),
            this.renderBody()
        );
    }
}
CartProducts.displayName = 'CartProducts';

CartProducts.defaultProps = {
    items: []
};

CartProducts.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            image: PropTypes.string.isRequired,
            link: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            branch: PropTypes.string,
            brand: PropTypes.string,
            stockStatus: PropTypes.boolean,
            price: PropTypes.string.isRequired,
            oldPrice: PropTypes.string,
            sale: PropTypes.string,
            stock: PropTypes.number.isRequired,
            quantity: PropTypes.number.isRequired,
            sku: PropTypes.string.isRequired,
            isBlocked: PropTypes.bool
        })
    ),
    handleRemoveItem: PropTypes.func.isRequired
};
export default CartProducts;
