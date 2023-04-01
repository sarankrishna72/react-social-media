import React from 'react'
import './Popup.scss';
import PropTypes from 'prop-types';


export const PopupClose = ({classes, closePopup}) => {
  return (
    <>
      <div onClick={() => closePopup('icon')} className={`width-30-height-30-px bg-e4e6eb  border-radius-50-percentage display-flex align-items-center justify-content-center ${classes || ''}`}>
        <div className='ripple border-radius-50-percentage display-flex align-items-center justify-content-center'>
          <span className="material-icons">close</span>
        </div>
       
      </div>
    </>
  )
}

PopupClose.propTypes = {
  classes: PropTypes.string,
  closePopup: PropTypes.func
};

PopupClose.defaultProps = {
  classes: '',
  closePopup: () => {}
};

const Popup = ({overlayClose, classes, children, contentWidthClassess, closePopup}) => {
  return (
    <>
      <div id="popup-container"  className={`display-flex justify-content-center align-items-center ${classes || ''}`}>
        <div id="popup-overlay" className={`${overlayClose ? 'overlay-bg': ''}`} onClick={() => closePopup('overlay') }></div>
        <div id="popup-content-box" className={`${contentWidthClassess || ''} custom-scrollbar`}>
            {children}
        </div>
      </div>
    </>
  )
}

Popup.propTypes = {
  overlayClose: PropTypes.bool,
  children: PropTypes.node,
  classes: PropTypes.string,
  contentWidthClassess: PropTypes.string,
  closePopup: PropTypes.func
};

Popup.defaultProps = {
  overlayClose: true,
  children: null,
  classes: '',
  contentWidthClassess: '',
  closePopup: () => {}
};

export default Popup