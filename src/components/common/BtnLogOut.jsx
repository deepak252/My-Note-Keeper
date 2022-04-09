import React from 'react';
import "./BtnLogOut.scss";
import {   FaPowerOff} from 'react-icons/fa';
import { signOutUser } from '../../services/firebaseAuthService';


const BtnLogOut = () => {
  
  return (
    <button id = "Btn-Log-Out" onClick={signOutUser}>
        Log Out  <FaPowerOff size={20} style={{paddingLeft:"6px"}}/>
    </button>
  )
}

export default BtnLogOut;
