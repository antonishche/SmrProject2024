import React, { useState } from 'react'
import './Description.scss'
import TopPanel from '../../Components/TopPanel/TopPanel'
import about from '../../aboutUs.json'

export default function Description() {
  const [modal, setModal] = useState(false)
  const [element, setElement] = useState('')
  const arrow = "<";

  function readMore() {
    window.scrollTo({
      top: 0,
    });
  }
  return (
    <>
    {!modal && <div className="container_descr">
      <TopPanel name={'Chefis'} />
      <div className="boxes">
        {about.map((elem) => {
          return <div key={elem.id} className="box">
            <h2>{elem.name}</h2>
            <img className={elem.imageBase ? 'img' : 'none'} src={elem.imageBase} alt="" />
            <div className={elem.imageProfile ? "profile-descr" : 'none'}>
              <img className='img-profile' src={elem.imageProfile} alt="" />
              <h3>{elem.text}</h3>
            </div>
            <div className={elem.imageBase1 && elem.imageBase2 ? "kits" : 'none'}>
              <img className='img-kit1' src={elem.imageBase1} alt="" />
              <img className='img-kit2' src={elem.imageBase2} alt="" />
            </div>
            <button onClick={()=>{setElement(elem);setModal(true);readMore()}}>Описание</button>
          </div>
        })}
      </div>
    </div>}
    {modal && <div className="modal-descr">
        <div className="scroll-div">
        <div className="logo_name_box">
          <div onClick={() => setModal(!modal)} className='go_back'><p className='arr_transform'>{arrow}</p></div>
        </div>
        <img className={element.image ? 'img' : 'none'} src={element.image} alt="" />
        <img className={element.imageProfile ? 'img' : 'none'} src={element.imageProfile} alt="" />
        <div className="text_descr">{element.description}</div>
        <div className="row">
          <img src="facebook.png" alt="" />
          <img src="instagram.png" alt="" />
        </div>
        </div>
      </div>}
    </>
  )
}
