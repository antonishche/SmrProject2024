import React from 'react'
import './Loading.scss'

export default function Loading() {
    return (
        <div className="container_loading">
            <div className="loader">
                <div className="inner one"></div>
                <div className="inner two"></div>
                <div className="inner three"></div>
            </div>
        </div>
    )
}
