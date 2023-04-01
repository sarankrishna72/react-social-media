import React from "react"
import PropTypes from 'prop-types';
import "./Card.scss";

export const CardHeader = (props) => {
  return (
    <div className={`${props.classes}`}>
      {props.children}
      { props.label && 
        <div className="bg-d7e6f8 padding-top-p4-em card-header-label padding-bottom-p4-em padding-right-1p3-em padding-left-1p3-em lato-semibold">
          {props.label}
        </div>
      }
    </div>
  )
};

export const CardBody = (props) => {
  return (
    <div className={`width-100-percentage ${props.classes}`}>
      {props.children}
    </div>
  )
}

export const CardFooter = (props) => {
    return (
      <div className={`width-100-percentage ${props.classes}`}>
        {props.children}
      </div>
    )
}

CardFooter.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.string
};
  
CardFooter.defaultProps = {
  classes: '',
  children: null,
};
  

CardHeader.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
  classes: PropTypes.string
};

CardHeader.defaultProps = {
  label: '',
  classes: '',
  children: null,
};

CardBody.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.string
};
  
CardBody.defaultProps = {
  classes: '',
  children: null,
};

export const CardIcon = (props) => {
  return(
    props.children
  )
}

export const Card = ({style,...props}) => {
  return (
    <div className={`width-100-percentage bg-ffffff padding-2-em card  border-radius-10-px ${props.classes}`} style={style} >
        {props.children}
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.string
};

Card.defaultProps = {
  classes: '',
  children: null,
};
export default Card;