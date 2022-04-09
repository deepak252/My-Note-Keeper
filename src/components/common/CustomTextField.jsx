import "./CustomTextField.scss";

import React from 'react'

const CustomTextField = (props) => {
    const {type,onChange,value,placeholder} = props;
    return (
        <input 
            className="Custom-Text-Field"
            type={type} 
            onChange={onChange} 
            value={value} 
            placeholder={placeholder}
            
        />
    )
}

export default CustomTextField;
