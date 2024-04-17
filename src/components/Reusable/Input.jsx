import React, { forwardRef } from 'react'

function Input({changeInput,className='',type,placeholder,value,isDisable},ref) {
  return (
    <input onChange={changeInput} type={type} placeholder={placeholder} value={value} className={` w-3/4 px-1 border-2 outline-blue-500  py-1 ${className}`} ref={ref} disabled={isDisable}/>
  )
}

export default forwardRef(Input)
