const host = typeof API_HOST === 'undefined' ? '' : API_HOST;
const isDevEnv = process.env.NODE_ENV === 'development';

export function loadData() {
    let url = `${host}/api/cart`;

    if (isDevEnv) {
        url = 'http://demo8280979.mockable.io/cart';
    }

    return fetch(url, {
        credentials: isDevEnv ? 'omit' : 'include'
    })
        .then((res) => res.json())
        .then((json) => {
            return {
                ...json,
                data: {
                    ...json.data,
                    shippingFee: 20000,
                    priceConfigs: {
                        currency: 'VND',
                        decimalPoint: ',',
                        precision: 0,
                        thoudsandsDep: '.',
                        currencyPosition: 'right'
                    }
                }
            };
        });
}

export function requestUpdateQuantity({ sku, quantity }) {
    let url = `${host}/api/cart/update`;
    const formData = new FormData();

    formData.append('productId', sku);
    formData.append('quantity', quantity);

    if (isDevEnv) {
        url = 'http://demo8280979.mockable.io/cart/add';
    }

    return fetch(url, {
        method: 'POST',
        credentials: isDevEnv ? 'omit' : 'include',
        body: formData
    }).then((res) => res.json());
}

export function requestRemoveItem({ sku }) {
    const formData = new FormData();

    formData.append('productId', sku);

    return fetch(`${host}/api/cart/remove`, {
        method: 'POST',
        credentials: isDevEnv ? 'omit' : 'include',
        body: formData
    }).then((res) => res.json());
}
