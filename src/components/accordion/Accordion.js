import React from 'react';
import './Accordion.scss';


export const AccordionItem = (props) => {
    return (
        <>
            <div className=" position-relative">
                <input type="checkbox" id={props.id} className="accordion accordion-checkbox" />
                <label   className={`${props.classes} accordion-label min-height-50-px font-weight-500 border-radius-6-px white-space-nowrap text-overflow-ellipsis overflow-hidden cursor-pointer display-flex justify-content-space-between`} htmlFor={props.id}>
                    {props.title}
                    <div className="accordion-icon">
                        <i className='material-icons accordion-open'>keyboard_arrow_down</i>
                        <i className='material-icons accordion-close'>keyboard_arrow_up</i>
                    </div>
                </label>
                <ul className='accordion-links'>
                    <li>
                        {props.children}
                    </li>
                </ul>
            </div>
        </>
    )
}

const Accordion = (props) => {
  return (
    <>
        <div className="menu margin-0-auto width-100-percentage padding-top-20-px padding-bottom-20-px accordion-container">
            {props.children}
        </div>
    </>
  )
}

export default Accordion