import React from 'react'

import '../css/loading-screen.css'
import Pokeball from '../img/pokeball.svg'

export default function LoadingScreen() {
    return (
        <div>
           <img className="loading-graphic" src={Pokeball} alt="Loading..."/>
        </div>
    )
}
