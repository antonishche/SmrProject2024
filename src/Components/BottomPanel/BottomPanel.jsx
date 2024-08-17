import React from 'react'
import './BottomPanel.scss'
import { useNavigate } from 'react-router-dom'

export default function BottomPanel() {
    const navigate = useNavigate();
  return (
    <div className="black_bottom">
        <img src="reserv-icon.png" onClick={()=>navigate('/')} alt="" />
        <img src="menu-icon.png" onClick={()=>navigate('/menu')} alt="" />
        <img src="basket.png" onClick={()=>navigate('/basket')} alt="" />
        <img src="contacts-icon.png" onClick={()=>navigate('/contacts')} alt="" />
    </div>
  )
}
