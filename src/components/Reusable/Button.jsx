import React from 'react'
import { forwardRef } from 'react'

function Button({text,className='',onClick},ref) {
  return (
    <React.Fragment>
        <button className={`bg-[#3593c9] py-1 px-6 active:bg-[#4da3d4] transition-all ${className}`} ref = {ref} onClick={onClick}>{text}</button>
    </React.Fragment>
  )
}

export default forwardRef(Button);
