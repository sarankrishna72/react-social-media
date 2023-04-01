
import React from 'react';
import Toast from './Toast';
import "./Toast.scss";
import {useSelector} from 'react-redux';

const ToastContainer = () => {
    const state = useSelector(state => state.toast);
    return (
        <div className={`position-absolute overflow-hidden z-index-50  toast-position-${state?.configuration?.toast_position || 'top-right'}`}>
            {/* <div className={` ` }> */}
                <div className="max-width-400-px margin-o-auto">
                    {
                        state?.toasts && state?.toasts.map(toast => (
                            <Toast {...toast} key={toast.id}/>
                        ))
                    }
                </div>
            {/* </div> */}
        </div>
        
    )
}

export default ToastContainer;