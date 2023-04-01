import React from "react";
import PropTypes from 'prop-types';
// import { useToastStateContext } from "../../Context/ToastContext";
const toastClass = (type) => {
    switch (type) {
        case 'success':
            return 'toast--green';
        case 'error':
            return 'toast--red';
        case 'warning':
            return 'toast--yellow';
        case 'info':
            return 'toast--blue';    
        default:
            return 'toast--green';
    }
}


const icon = (type) => {
    switch (type) {
        case 'success':
            return (<span className="material-icons icon-size color-ffffff">done</span>);
        case 'error':
            return <span className="material-icons icon-size color-ffffff">error</span>;
        case 'warning':
            return <span className="material-icons icon-size color-ffffff">report</span>;
        case 'info':
            return <span className="material-icons icon-size color-ffffff">info</span>;    
        default:
            return <span className="material-icons icon-size color-ffffff">done</span>;
    }
}




const Toast = ({toastType, id, title, description}) => {
    // const {dispatch} = useToastStateContext();

    return (
        <>
            <div id={id} className={`toast__container margin-bottom-10-px`} >
                <div className="toast__cell">
                    <div className={`toast ${toastClass(toastType)}`}>
                        <div className="toast__icon ">
                            {icon(toastType)}
                            {/* <i className={`icns icon-toast-${toastType} width-15-height-15-px`}></i> */}
                        </div>
                        <div className="toast__content">
                            <p className="toast__type">{title}</p>
                            <p className="toast__message">{description}</p>
                        </div>
                        <div className="toast__close">
                            <i className="icns icon-close width-15-height-15-px" ></i>
                        </div>
                    </div>
                    <div className={`toast__progress ${toastClass(toastType)} active`}></div>
                </div>
               
            </div>
        </>
    )
}

// onClick={() =>  dispatch({type: "DELETE_TOAST", id}) }

Toast.propTypes = {
    toastType: PropTypes.oneOf([
      'success',
      'error',
      'info',
      'warning',
    ]),
    toastPosition: PropTypes.oneOf([
        'top-right',
        'top-left',
        'bottom-right',
        'bottom-left',
        'top-center',
        'bottom-center'
    ]),
    title: PropTypes.string,
    description:  PropTypes.string
};

Toast.defaultProps = {
    toastType: 'success',
    title: 'Success',
    description: 'Completed Successfully',
    toastPosition: 'top-right',
    hideToastButtonClick: ()=> {}
}



export default Toast;



// const Toast = ({toastType, id, title, hideToastButtonClick, toastPosition, description}) => {
//     useEffect(()=> {
//         setTimeout(() => {
//             hideToastButtonClick()
//         },5000)

//     },[ hideToastButtonClick])

// }





// export default Toast;