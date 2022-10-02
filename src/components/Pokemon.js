import React from 'react'


export default function Pokemon({pokemon, id}) {


    return (
        <div className="d-flex align-items-stretch justify-content-between  poke-image">
        
            <div className="p-3 w-100 d-flex flex-column justify-content-center">
   
            <p className=" text-white mb-0"># {pokemon.id}</p>
                    
            <h3 className="ms-1 text-white  mb-0">{pokemon.name}</h3>
            <span className="d-flex gap-1 mt-2">
                
                {pokemon.type.map((pokeType, index)=>{
  
                        return <p key={index} style={{ fontSize: '12px' }} className={`btn type-${pokeType.type.name} text-white rounded-pill first-letter-capital mb-0`}>{pokeType.type.name}</p>;
                    }
                  )}
            </span>
            </div>
           
            <div className="p-3 d-flex justify-content-center">
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} className="bg-secondary rounded-circle p-2" alt=""/>
        </div>
            
        </div>
    )
}
