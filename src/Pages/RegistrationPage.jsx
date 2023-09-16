import React from 'react'
import SignUpNgo from '../Component/SignUpNgo';
import { SetMetaData } from '../CustomHook/SetMetaData';
function RegistrationPage() {
  SetMetaData("description",
    "Sign up and create your account on Poodles Pet Adoption. Be part of our community and take the first step in providing a loving home to an animal in need.",
    "Join Poodles Pet Adoption Platform - Create Your Account",
    )
  return (
    <div>
        <SignUpNgo/>
    </div>
  )
}

export default RegistrationPage