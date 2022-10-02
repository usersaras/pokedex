import React, {useEffect, useState} from 'react'
import {useParams } from "react-router-dom";
import Loading from '../components/LoadingScreen'


export default function IndividualComponent() {
    
    //taking value of ID from url
    let { id } = useParams();

    //state variable declaration
    const [loading, setLoading] = useState(true);
    const [pokemonStats, setPokemonStats] = useState({});

    //fetching pokemon's information
    const fetchInfo = async() => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        const data = await response.json()

        const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/encounters`)
        const data2 = await response2.json();

        //setting state variables
        setPokemonStats({...data, encounters: data2});
        setLoading(false);
    }
    
    //useEffect w/o dependency array, runs on first render only
    useEffect(() => {
        //fetching pokemon info, function call
        fetchInfo()
    }, [])
    
    if(loading){
        return <Loading />
    }
    return (
        <div className="p-5">
        <div className="bg-dark rounded-top p-3">
        <h5 className="text-white mb-0">#{id}</h5>
        </div>
        <div className="bg-light rounded-bottom p-3 border border-top-0">

           
        <div className="d-flex gap-3 align-items-center">
            <div className="border d-inline-block rounded bg-white">
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt=""/>
            </div>
                
            <div>
            <h1>{pokemonStats.name}</h1>
            <p className="mb-0">
                {pokemonStats.types.map((ability, index) => {
                    return <div key={index} className={`type-${ability.type.name} d-inline me-1 px-2 py-1 rounded-pill text-white m-0 first-letter-capital`}>{ability.type.name}</div>
                })}
            </p> 
            <p className="mb-0 mt-2"><span class="fw-bold">Height:</span> {pokemonStats.height.toString().length>1 ? pokemonStats.height.toString().slice(0,1)+"."+pokemonStats.height.toString().slice(-1 ) : "0."+pokemonStats.height.toString()}m, 
            <span class="fw-bold">Weight:</span> {pokemonStats.weight.toString().slice(0,-1)+"."+pokemonStats.weight.toString().slice(-1)}kgs</p>
            </div>
        </div>

        <nav className="mt-3">
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Stats</button>
                <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Moves</button>
                <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Abilities</button>
                <button className="nav-link" id="nav-encounters-tab" data-bs-toggle="tab" data-bs-target="#nav-encounters" type="button" role="tab" aria-controls="nav-encounters" aria-selected="false">Encounters</button>
            </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
            <div className="tab-pane fade show active px-3 py-4 bg-white border border-top-0 rounded-bottom" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                <div className="d-flex flex-column gap-3">
                    {pokemonStats.stats.map((stat, index) => {
                        return <div key={index}>
                            
                            <p className="mb-0 first-letter-capital">{stat.stat.name}</p>
                            <div className="progress">
                                <div className={`progress-bar bg-success`} role="progressbar" style={{ width: `${stat.base_stat}%` }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">{stat.base_stat}</div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
            <div className="tab-pane fade px-3 py-4 bg-white border border-top-0 rounded-bottom" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                <div className="row g-3">
                    {pokemonStats.moves.sort().map((move,index) => {
                        return <div key={index} className="col-sm-3">
                            <div className="bg-light p-2 rounded">
                                <p className="mb-0 text-center first-letter-capital">{move.move.name.replace("-", " ")}</p>
                            </div>
                        </div>
                    })}
                </div>
            </div>
            <div className="tab-pane fade px-3 py-4 bg-white border border-top-0 rounded-bottom" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
            <div className="row g-3">
                    {pokemonStats.abilities.map((ability,index) => {
                        return <div key={index} className="col-sm-3">
                            <div className="bg-light p-2 rounded">
                                <p className="mb-0 text-center first-letter-capital">{ability.ability.name}</p>
                            </div>
                        </div>
                    })}
                </div>
            </div>
            <div className="tab-pane fade px-3 py-4 bg-white border border-top-0 rounded-bottom" id="nav-encounters" role="tabpanel" aria-labelledby="nav-encounters-tab">
            <div className="row g-3">
                    {pokemonStats.encounters.map((encounter,index) => {
                        return <div key={index} className="col-sm-3">
                            <div className="bg-light p-2 rounded">
                                <p className="mb-0 text-center first-letter-capital">{encounter.location_area.name.replace("-", " ").replace("-", " ")}</p>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    </div>
        </div>
    )
}
