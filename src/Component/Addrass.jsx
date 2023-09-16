import React,{useContext} from 'react'
import { UserContext } from '../App'
function Address() {
  const {User, NgoData,ngoId} = useContext(UserContext);
  const ngoData = Object.values(NgoData);
  return (
    <>
    {ngoData.map((data)=>{
      return(
        <div className='address col-12 col-md-6'>
        <h3>Welcome {data.ngoname}</h3>
      <div className='address_box'>
      <p>Address: {data.address}</p>
      <p>Email:{data.email}</p>
      <p>Mobile:{data.mobile} </p>
    </div>
    </div>
      )
    })}
    </>
    
  )
}

export default Address