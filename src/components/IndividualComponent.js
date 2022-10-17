import React, {useEffect, useState, useContext} from 'react'
import {useParams } from "react-router-dom";
import Loading from '../components/LoadingScreen'

import PokemonMoves from '../components/PokemonMoves'

const PokemonContext = React.createContext();

export default function IndividualComponent() {
    
    //taking value of ID from url
    let { id } = useParams();

    

    //state variable declaration
    const [loading, setLoading] = useState(true);
    const [pokemonStats, setPokemonStats] = useState({});

    //fetching pokemon's information
    const fetchInfo = async() => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/encounters`)
        const pokemonSpeciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
        const pokemonSpecies = await pokemonSpeciesRes.json();

        let evolutionChainRes = await fetch(pokemonSpecies.evolution_chain.url);
        const evolutionChain = await evolutionChainRes.json();

        // const evolution1Res = await fetch(evolutionChain.chain.evolves_to)

        const responses = await Promise.all([response.json(), response2.json()])

        const pokemonMovesList = responses[0].moves.map((move)=>{
            return (move.version_group_details[0].move_learn_method.name)
        })
        const listOfMoves = [...new Set(pokemonMovesList)]

        let movesOfPokemon = [];
        let fetchMoves = [];

        if (responses) {
            movesOfPokemon = responses[0].moves.map(item => {
                return item.move.url
            })
        }

        //fetching details of moves pokemon can learn
        const pokemonMovesRes = await Promise.all(movesOfPokemon.map(async url => {
            const resp = await fetch(url);
            return await resp.json();
        }));

       
              

        let spriteObj= [];
        let sprite2Obj = [];
        if(evolutionChain){
            if(evolutionChain.chain.evolves_to.length>0){
            const fetchSprite1Res = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolutionChain.chain.species.name}/`)
            const fetchSpriteRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolutionChain.chain.evolves_to[0].species.name}/`)
 
            spriteObj = await Promise.all([fetchSprite1Res.json(), fetchSpriteRes.json()])

            if(evolutionChain.chain.evolves_to[0].evolves_to.length > 0){
                const fetchSprite2Res = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolutionChain.chain.evolves_to[0].evolves_to[0].species.name}/`)
                sprite2Obj = await fetchSprite2Res.json();
            } 
        }  
    }


        //setting state variables
        setPokemonStats({
            ...responses[0], 
            encounters: [...responses[1]], 
            evolutionChain: evolutionChain,
            pokemonSpecies: pokemonSpecies,
            evolutionSprite: typeof(spriteObj[0]) == "undefined" ? "" : spriteObj[0].sprites.front_default,
            evolutionSpriteOne: typeof(spriteObj[1]) == "undefined" ? "" : spriteObj[1].sprites.front_default,
            evolutionSpriteTwo: typeof(sprite2Obj.sprites) == "undefined" ? "" : sprite2Obj.sprites.front_default,
            pokemonMoves: pokemonMovesRes,
            listOfMoves
        });

        setLoading(false);
    }

 

    // const fetchSprites = async() => {
    //     setLoading(true);

    //     setTimeout(()=>{
    //         setLoading(false);
    //     }, 1000)
    // }
    
    //useEffect w/o dependency array, runs on first render only
    useEffect(() => {
        //fetching pokemon info, function call
        fetchInfo()
    }, [])
  
    
    // {pokemonStats.moves[index].version_group_details[0].move_learn_method.name}

    console.log(pokemonStats);
    
    
    

    if(loading){
        return <Loading />
    }
    return (
   
    <PokemonContext.Provider value={{pokemonStats}}>
    <div className = "pb-5">
        <div className={`type-${pokemonStats.types[0].type.name} text-center`}>
            <img className="d-block mx-auto pokemon-jump" style={{width: "15%"}} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`} alt="" />
        </div>
        <div class={`text-center bg-white rounded rounded-5`} style={{marginTop: "-60px", paddingTop: "70px", zIndex: "200"}}>

            <h1>{pokemonStats.name}</h1>

            <p className="mb-0">
                {pokemonStats.types.map((ability, index) => {
                    return <div key={index} className={`type-${ability.type.name} d-inline me-1 px-2 py-1 rounded-pill text-white m-0 first-letter-capital`}>{ability.type.name}</div>
                })}
            </p> 
           
            <div class={`text-center fs-5 mt-3 type-${pokemonStats.types[0].type.name} d-inline-block p-3 px-4 rounded text-white fw-bold rounded-5`}>
                {pokemonStats.pokemonSpecies.flavor_text_entries[0].flavor_text}
            </div>
        </div>

        <div style={{width: "55%", margin: "0 auto"}}>
                <div class="mt-5 bg-light p-5 rounded rounded-3">
                    <div className="fs-5">
                        <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">About</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Base Stats</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Evolution</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="pills-moves-tab" data-bs-toggle="pill" data-bs-target="#pills-moves" type="button" role="tab" aria-controls="pills-moves" aria-selected="false">Moves</button>
                            </li>
                        </ul>
                        <div class="tab-content" id="pills-tabContent">

{/* About Tab */}
                            <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                <table className="table">
                                    <tr >
                                        <td style={{width: "25%"}} className="fw-bold text-muted">Genera</td>
                                        <td>{pokemonStats.pokemonSpecies.genera[7].genus}</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold text-muted">Habitat</td>
                                        <td className="first-letter-capital">{pokemonStats.pokemonSpecies.habitat.name}</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold text-muted">Height</td>
                                        <td>{pokemonStats.height.toString().length > 1 ? pokemonStats.height.toString().slice(0, 1) + "." + pokemonStats.height.toString().slice(-1) : "0." + pokemonStats.height.toString()} meter(s)</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold text-muted">Weight</td>
                                        <td>{pokemonStats.weight.toString().slice(0, -1) + "." + pokemonStats.weight.toString().slice(-1)} kilogram(s)</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold text-muted">Shape</td> 
                                        <td className="first-letter-capital">{pokemonStats.pokemonSpecies.shape.name}</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold text-muted">Egg Groups</td>
                                        <td className="d-flex gap-1">
                                            {
                                                pokemonStats.pokemonSpecies.egg_groups.map(egg_group => {
                                                    return <p className='first-letter-capital mb-0 bg-secondary text-white text-center rounded'>{egg_group.name}</p>
                                                })}</td>
                                    </tr>
                                </table>
                            </div>
{/* About Tab */}

{/* Base Stats Tab */}
                            <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                <table className="table">
                                    {pokemonStats.stats.map(unit => {
                                        return <tr>
                                            <td style={{ width: "20%" }}>{unit.stat.name}</td>
                                            <td>
                                                <div class="position-relative p-0">
                                                    <div class="border bg-white" style={{ width: "100%", height: "30px", borderRadius: "5px" }}>
                                                        <p class="mb-0 ms-3 position-absolute" style={{ zIndex: "2" }}>{unit.base_stat}</p>
                                                    </div>
                                                    <div class={`type-${pokemonStats.types[0].type.name} position-absolute top-0`} style={{ height: "100%", width: `${unit.base_stat}%`, borderRadius: "5px 0px 0px 5px"}}>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    })}
                                </table>
                            </div>
                            {/* Base Stats Tab */}

                            {/* Evolution Tab */}
                            <div className="tab-pane fade"  id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">

                             
                                <div className="">
                                    {(pokemonStats.evolutionChain.chain.evolves_to.length == 0) ? "No evolution data available for this Pokemon!" :
                                        <>
                                            {/* Base Form */}
                                            <div class="d-flex gap-5 justify-content-center align-items-center">
                                            <div className="d-flex flex-column gap-0 align-items-center">
                                                <img src={`${pokemonStats.evolutionSprite}`} alt="" />
                                            </div>
                                            
                                            {/* Base Form */}
                                            <i className = "fa fa-chevron-right"></i>

                                            {/* First Evolution */}
                                            <div className="d-flex flex-column gap-0 align-items-center justify-content-center">
                                                <img src={`${pokemonStats.evolutionSpriteOne}`} alt={pokemonStats.evolutionChain.chain.evolves_to[0].species.name} />
                                            </div>
                                            
                                            {/* First Evolution */}
                                            </div>

                                            <p className="mb-0 text-center"><p className="first-letter-capital d-inline-block fw-bold">{pokemonStats.evolutionChain.chain.species.name}</p> evloves to <p className="first-letter-capital d-inline-block fw-bold">{pokemonStats.evolutionChain.chain.evolves_to[0].species.name}</p> at <span className="fw-bold">Level {pokemonStats.evolutionChain.chain.evolves_to[0].evolution_details[0].min_level}</span></p>

                                            {/* console.log(pokemonStats.evolutionChain.chain.evolves_to[0].species.name)
    console.log(pokemonStats.evolutionChain.chain.evolves_to[0].evolution_details[0].min_level); */}
    
    

                                        </>
                                    }

                                    {/* Second Evolution */}
                                    {(pokemonStats.evolutionChain.chain.evolves_to).length > 0 ?
                                        (pokemonStats.evolutionChain.chain.evolves_to[0].evolves_to.length) > 0 ?
                                            <>
                                            <div className="d-flex gap-5 justify-content-center align-items-center mt-3">
                                            <div className="d-flex flex-column gap-0 align-items-center justify-content-center">
                                                <img src={`${pokemonStats.evolutionSpriteOne}`} alt={pokemonStats.evolutionChain.chain.evolves_to[0].species.name} />
                                                </div>
                                                <i className = "fa fa-chevron-right"></i>
                                                <div className="d-flex flex-column gap-0 align-items-center justify-content-center">
                                                <img src={`${pokemonStats.evolutionSpriteTwo}`} alt="" />
                                               
                                                </div>
                                            </div> <p class="mb-0 text-center"><p className="first-letter-capital d-inline-block fw-bold">{pokemonStats.evolutionChain.chain.evolves_to[0].species.name}</p> evloves to <p className="first-letter-capital d-inline-block fw-bold">{pokemonStats.evolutionChain.chain.evolves_to[0].evolves_to[0].species.name}</p> at <span className="fw-bold">Level {pokemonStats.evolutionChain.chain.evolves_to[0].evolves_to[0].evolution_details[0].min_level}</span></p></> : "" : ""
                                    }
                                    {/* Second Evolution */}
                                </div>
                            </div>
                            {/* Evolution Tab */}

                             {/* Moves Tab */}
                            <div className="tab-pane fade" id="pills-moves" role="tabpanel" aria-labelledby="pills-moves-tab">
                                <PokemonMoves pokemonStats={pokemonStats}></PokemonMoves>
                            </div>
                            {/* Evolution Tab */}
                        </div>

                    </div>
                </div>
        </div>
    </div>
    </PokemonContext.Provider>    
      
    )
}
