import React, {useContext} from 'react'

export default function PokemonMoves({pokemonStats}) {
    
    return (
        <>
            {/* {pokemonStats.listOfMoves.map((move, index)=>{
                                return <p key={index} className="mb-0 bg-success d-inline-block rounded px-2 py-1 rounded-pill me-1 font-small">{move}</p>
                            })} */}

                            <div className="accordion accordion-flush" id="accordionFlushExample">

                                    {pokemonStats.pokemonMoves.sort((a, b) => {
                                        const nameA = a.name.toUpperCase();
                                        const nameB = b.name.toUpperCase();
                                        if (nameA > nameB) {
                                            return 1;
                                        }
                                        if (nameA < nameB) {
                                            return -1;
                                        }
                                        // names must be equal
                                        return 0;
                                    }).map((move, index) => {
                                        return  <div className="accordion-item">
                                        <h2 className="accordion-header" id={`flush-heading${move.name}`}>
                                          <button className="accordion-button collapsed bg-light" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse${move.name}`} aria-expanded="false" aria-controls={`flush-collapse${move.name}`}>
                                            <div className="d-flex gap-3 justify-content-between align-items-center pe-3 w-100">
                                                <p className="first-letter-capital mb-0 fw-bold">{move.name.replace("-", " ")}</p>  <p className={`first-letter-capital mb-0 type-${move.type.name} text-white px-2 py-1 rounded`}> {move.type.name}</p>
                                            </div>
                                          </button>
                                        </h2>
                                        <div id={`flush-collapse${move.name}`} class="font-small accordion-collapse collapse" aria-labelledby={`flush-heading${move.name}`} data-bs-parent="#accordionFlushExample">
                                          <div className="accordion-body">
                                          <p className="mt-3 mb-0">{move.flavor_text_entries[5].flavor_text} </p>
                                            <div class="d-flex justify-content-between mt-2 border rounded p-3">
                                                <p className="mb-0"><span className="text-muted fw-bold">Power:</span> <span className="bg-danger py-1 px-2 rounded text-white">{typeof(move.power)==="number" ?move.power: "N/A"}</span></p>
                                                <p className="mb-0"><span className="text-muted fw-bold">Accuracy:</span> <span className="bg-success py-1 px-2 rounded text-white">{typeof(move.accuracy)==="number" ?move.accuracy: "N/A"}</span></p>
                                                <p className="mb-0"><span className="text-muted fw-bold">PP:</span> <span className="bg-info py-1 px-2 rounded text-white">{typeof(move.pp)==="number" ?move.pp: "N/A"}</span></p>
                                            </div>
                                            {move.effect_entries.map((entry, index) => {
                                               return  <p key={index} className="mt-2">{entry.effect}</p>
                                            })}
                                            
                                          </div>
                                        </div>
                                      </div>
                                    })}
                                    </div>
        </>
    )
}
