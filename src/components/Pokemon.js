import React from 'react'
import Pokeball from '../img/pokeball.svg'

export default function Pokemon({pokemon, id}) {
    
    console.log(id.length);
    

    return (
        <div className=" align-items-stretch justify-content-between  poke-image">
        <p className="position-absolute text-center text-white mb-0 fs-3 fw-bold pokemon-number">{id.toString().length=="1" ? `#00${id}`: id.toString().length=="2" ? `#0${id}`: "#"+id}</p>
        <img src={Pokeball} className="poke-ball-pokemon" alt="pokeball"/>
        <div className="d-flex align-items-center justify-content-between">
            
            <div className="p-3 w-100 d-flex flex-column justify-content-start">
                <h3 className="ms-1 text-white  mb-0">{pokemon.name}</h3>
                <span className="d-flex gap-1 mt-2">

                    {pokemon.type.map((pokeType, index) => {

                        return <p key={index} style={{ fontSize: '12px' }} className={`py-1 px-2 pokemon-type text-white rounded-pill first-letter-capital mb-0`}>{pokeType.type.name}</p>;
                    }
                    )}
                </span>
            </div>
            <div className="d-flex justify-content-center align-items-center pokemon-sprite">
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`} className="w-75 pb-4" loading="lazy" alt={pokemon.name} />
            </div>
            </div>
        </div>
    )
}
