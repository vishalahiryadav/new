import React from "react";
function InputField({value,name,type,placeholder,onChange,className,id,required,pattern,onBlur,style,checked}){
    return(
        <input pattern={pattern} name={name} className={className} type={type} placeholder={placeholder} required={required} onChange={onChange} value={value}></input>

    )
}
function FileField({hidden,name,type,accept,onChange,className,id,style,required}){
    return (<input required={required} hidden={hidden} style={style} name={name} type={type} multiple accept={accept} onChange={onChange} className={className} id={id}></input>);
  }
export default InputField;
export {FileField}