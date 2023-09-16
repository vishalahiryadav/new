import React from 'react'

function Short_tab({img,value,className}) {
  return (
    <div className='short_tab d-flex justify-content-center align-items-center gap-4 border-none'>
       
       <img src={img} />
       <p className={className}>{value}</p>
    
    </div>
  )
}

export default Short_tab