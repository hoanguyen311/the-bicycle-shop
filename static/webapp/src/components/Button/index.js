import { Component, PropTypes } from 'react';
import { blockFactory } from 'rebem';

const ButtonBlock = blockFactory('l-button');

class Button extends Component {
    render() {
        const { text, ...props } = this.props;

        return ButtonBlock({
            ...props
        },
            ButtonBlock({
                elem: 'text',
                tag: 'span'
            }, text)
        );
    }
}
Button.defaultProps = {
    text: '',
    tag: 'button'
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
    tag: PropTypes.string
};

export default Button;
