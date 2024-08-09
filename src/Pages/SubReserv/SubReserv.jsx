import React, {useEffect} from 'react'
import './SubReserv.scss'
import { getAuth } from 'firebase/auth';
import { useAuth } from '../../hooks/use-auth';
import TopPanel from '../../Components/TopPanel/TopPanel';
import { useNavigate } from 'react-router-dom';
import { ref, set } from "firebase/database";
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../../main';

export default function SubReserv() {
    
    const {place, data, guests, table, isTable} = useAuth()
    const navigate = useNavigate()
    const auth = getAuth()

    useEffect(()=>{
        if (isTable) {
            return
        }
        navigate('/reserv')
    })

    function writeUserData() {
        set(ref(db, 'users/' + auth.currentUser.uid), {
            place: place,
            data: data,
            guests : guests,
            table: table,
        });
      }

    // async function subReserv() {
    //     try {
    //         const docRef = await addDoc(collection(db, "users"), {
    //           id: auth.currentUser.uid,
    //           place: place,
    //           data: data,
    //           guests: guests,
    //           table: table,
    //         });
    //         console.log("Document written with ID: ", docRef.id);
    //         console.log(docRef);
    //       } catch (e) {
    //         console.error("Error adding document: ", e);
    //       }
    // }

  return (
    <div className="container">
        <TopPanel link={'/reserv'}/>
        <div className="info_reserv">
        <h2>Подтвердить <br />бронироование?</h2>
            <div className='between'>
                <p>Дата:</p>
                <p>{data}</p>
            </div>
            <div className='between'>
                <p>Место:</p>
                <p>{place}</p>
            </div>
            <div className='between'>
                <p>Кол-во гостей:</p>
                <p>{guests}</p>
            </div>
            <div className='between'>
                <p>Номер столика:</p>
                <p>{table}</p>
            </div>
            <button className="big_btn" onClick={()=>writeUserData()}>Подтвердить</button>
        </div>
    </div>
  )
}
