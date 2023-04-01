import React, { useState } from 'react';
import './Input.scss';

const Input = (props) => {
    const { onChange, id, label,  theme, value, type, errorMessages,classes, ...inputProps } = props;
    const [showPassword, setShowPassword] = useState(false)
    const [validationError, setErrors] = useState('')

    const showPasswordEvent = () => {
        setShowPassword(!showPassword)
    }

    const changeInput = (event) => {
        onChange(event)
        setErrors('')
        checkValidation(event)
    }

    const checkValidation = (event) => {
       
        if (!event.target.validity.valid) {
            for (const key in event.target.validity) {
                if (event.target.validity[key]) {
                    setErrors(errorMessages ? (errorMessages[key] || event.target.validationMessage || 'Invalid entry please provide correct input') : 'This field is required') 
                }
            }
        }
        
    }
    return (
        
        <>
            {(() => {
                switch (props.type) {
                    case 'text':
                        return <div className={`${theme} width-100-percentage position-relative ${classes}` } >
                                    <input className='form__inputfield' value={value || ''} data-input-error={validationError ? true.toString() : false.toString()} type={type} {...inputProps} onChange={changeInput} onBlur={checkValidation}/>
                                    {label && 
                                    <label>{label}</label>   
                                    }
                                </div>
                    case 'textarea':
                        return <div className={`${theme} width-100-percentage position-relative ${classes}`} >
                                    <textarea className='form__inputfield' value={value || ''} data-input-error={validationError ? true.toString() : false.toString()} type={type} {...inputProps} onChange={changeInput} onBlur={checkValidation}></textarea>
                                    {label && 
                                    <label>{label}</label>   
                                    }
                                </div>
                    case 'password':
                        return <div className={`${theme} width-100-percentage position-relative ${classes}`} >
                                    <input className='form__inputfield' value={value || ''} data-input-error={validationError ? true.toString() : false.toString()} type={showPassword ? "text" : "password"}  {...inputProps} onChange={changeInput} onBlur={checkValidation}/>
                                    {label && 
                                    <label>{label}</label>   
                                    }
                                    <i className= {`icns width-20-height-20-px position-absolute top-11-px right-11-px cursor-pointer ${showPassword ? "icon-password-hide" : 'icon-password-show'}` } onClick={ showPasswordEvent }></i>
                                </div> 
                    case 'checkbox':
                        return <div className={`display-flex align-items-center ${classes}`}>
                                    <input type='checkbox' checked={value || false} className="width-20-height-20-px login__checkbox border-radius-4-px margin-0-px" {...inputProps} onChange={changeInput}/>
                                    {label && <span className='margin-left-10-px lato-semibold color-717386 font-size-1-em line-height-1-em'>{label}</span>}
                                </div> 
                    default:
                        return <div className={`${theme} width-100-percentage position-relative ${classes}`} >
                                    <input className='form__inputfield' value={value || '' } data-input-error={validationError ? true.toString() : false.toString()} type={type} {...inputProps}   onChange={changeInput} onBlur={checkValidation}/>
                                    {label && 
                                    <label>{label}</label>   
                                    }
                                </div>
                }
            })()}
            {
                validationError && 
                <span className='help-block'>{validationError}</span>
            }
        </>
    )
}

export default Input;