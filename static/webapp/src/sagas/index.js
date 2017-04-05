import app from './app';
import products from './products';

export default function* () {
    yield [
        app(),
        products()
    ];
}
