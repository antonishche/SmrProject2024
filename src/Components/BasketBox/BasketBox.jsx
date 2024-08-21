import React, { useState, useEffect } from 'react'

export default function BasketBox(props) {
    const [count, setCount] = useState(props.el.count)
    const [cost, setCost] = useState()
    const basket = JSON.parse(localStorage.getItem('basketFood'))
    useEffect(() => {
        if (props.el.size == 'small') {
            setCost(props.el.souce.cost)
            return
        } else if (props.el.size == 'medium') {
            setCost(Math.trunc(props.el.souce.cost * props.el.souce.multiplier))
            return
        } else if (props.el.size == 'big') {
            setCost(Math.trunc(props.el.souce.cost * props.el.souce.multiplier * props.el.souce.multiplier))
            return
        }
    }, [])
    // function minus() {
    //     if (count == 1) {
    //         const newBasket = props.basket.filter((n) => { return n !== props.el })
    //         props.set(newBasket)
    //         localStorage.setItem('basketFood', JSON.stringify(newBasket))
    //         return
    //     }
    //     basket.forEach((elem) => {
    //         if (elem.souce.name === props.el.souce.name && elem.souce.type === props.el.souce.type && elem.size === props.el.size) {
    //             elem.count = elem.count - 1;
    //         }
    //     })
    //     localStorage.setItem('basketFood', JSON.stringify(basket))
    //     setCount(count - 1)
    // }
    // function plus() {
    //     if (count == 5) {
    //         return
    //     }
    //     basket.forEach((elem) => {
    //         if (elem.souce.name === props.el.souce.name && elem.souce.type === props.el.souce.type && elem.size === props.el.size) {
    //             elem.count = elem.count + 1;
    //         }
    //     })
    //     localStorage.setItem('basketFood', JSON.stringify(basket))
    //     setCount(count + 1)
    // }
    return <div className="basket_box">
        <div className="basket_bag">
            <div className='img' style={{ backgroundImage: 'url(' + props.el.souce.image + ')' }}></div>
            <div className="inf">
                <p>{props.el.souce.type + ' ' + props.el.souce.name}</p>
                <div className="row">
                    <p>{props.el.size}</p>
                    <p className='cost'>{cost * count + ' р'}</p>
                </div>
            </div>
            <div className="counter">
                <button onClick={()=>{props.minus(count, props.el);if (count == 1) {
                    const newBasket = props.basket.filter((n) => { return n !== props.el })
                    props.set(newBasket)
                    localStorage.setItem('basketFood', JSON.stringify(newBasket))
                    return
                } setCount(count-1)}}>-</button>
                <p>{count}</p>
                <button onClick={()=>{props.plus(count, props.el);if (count == 5) {
                    return
                } setCount(count+1) }}>+</button>
            </div>
        </div>
    </div>
}
