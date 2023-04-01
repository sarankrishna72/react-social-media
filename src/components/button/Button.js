import React from 'react';
import PropTypes from 'prop-types';
// 
const buttonType = (btnType) => {
  switch (btnType) {
    case 'primary':
      return 'button__primary';
    case 'secondary':
      return 'button__secondary';
    case 'primary-outline':
      return 'button__primary__outline';
    case 'secondary-outline':
      return 'button__secondary__outline';
    case 'tertiary':
      return 'button__tertiary';
    case 'tertiary-outline':
      return 'button__tertiary__outline';  
    default:
      return '';
  }
};

const buttonRadius = (radiusSpec) => (radiusSpec ? 'border-radius-p3-em ' : '');

const buttonDimentions = (buttonSize) => {
  switch (buttonSize) {
    case 'small':
      return 'padding-top-p3-em padding-bottom-p3-em padding-left-p5-em padding-right-p5-em';
    case 'medium':
      return 'padding-top-p6-em padding-bottom-p6-em padding-left-p9-em padding-right-p9-em';
    case 'large':
      return 'padding-top-1-em padding-bottom-1-em padding-left-2-em padding-right-2-em';
    default:
      return '';
  }
};

const fullWidthButton = (isFullWidth) => (isFullWidth ? 'display-block width-100-percentage' : '');

const Button = ({
  btnType,
  rounded,
  size,
  fullWidth,
  onClick,
  classes,
  children,
  ...props
}) => (
  <button
    {...props}
    onClick={onClick}
    className={`${buttonType(btnType)} ${buttonRadius(rounded)}
    ${buttonDimentions(size)} ${fullWidthButton(fullWidth)}
    text-align-center ripple position-relative white-space-nowrap position-relative overflow-hidden __button cursor-pointer ripple ${classes}`}
  >
    {children}
  </button>
);

Button.propTypes = {
  btnType: PropTypes.oneOf([
    'primary',
    'secondary',
    'primary-outline',
    'secondary-outline',
    'tertiary',
    'tertiary-outline'
  ]),
  rounded: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func,
  classes: PropTypes.string,
  children: PropTypes.node,
};

Button.defaultProps = {
  btnType: 'primary',
  rounded: false,
  size: 'medium',
  fullWidth: false,
  onClick: () => {},
  classes: '',
  children: null,
};

export default Button;