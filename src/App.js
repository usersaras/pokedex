import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/js/dist/tooltip'

import React, { useEffect, useReducer } from 'react';
import Pokemon from './components/Pokemon'
import {Link} from 'react-router-dom'
import Loading from './components/LoadingScreen'

//reducer function to set values
const reducer = (state, action) => {
  if (action.type === 'SET_POKEMONTYPES') {
    return {
      ...state,
      pokemonTypes: [...action.payload]
    }
  }

  if (action.type === 'SET_SEARCHCRITERIA') {
    return {
      ...state,
      searchCriteria: action.payload
    }
  }

  if (action.type === 'SET_NEWPAGE') {
    return {
      ...state,
      page: action.payload
    }
  }

  if (action.type === 'SET_FILTEREDARRAY') {
    return {
      ...state,
      isFiltered: true,
      filteredArray: [...action.payload]
    }
  }

  if (action.type === "SET_FILTEREDARRAYFALSE") {
    return {
      ...state,
      isFiltered: false
    }
  }

  if (action.type === "SET_LOADING") {
    return {
      ...state,
      loading: true
    }
  }

  if (action.type === 'SET_POKEMONSDETAIL') {
    return {
      ...state,
      loading: false,
      pokemonsDetail: action.payload
    }
  }
}

function App() {

  //useEffect
  useEffect(() => {
    fetchIndividualPokemons(state.page);
  }, [])

  //setting up reducer 
  const [state, dispatch] = useReducer(reducer, { loading: true, searchCriteria: '', page: 51, pokemonsDetail: [], pokemonTypes: [], isFiltered: false, filteredArray: [] });

  //function to fetch pokemon's data
  async function fetchIndividualPokemons(num) {

    //set loading screen
    dispatch({ type: "SET_LOADING" })
    try {
      let url = [];

      //for loop gets every pokemons url
      for (let i = 0; i < num; i++) {
        url[i] = `https://pokeapi.co/api/v2/pokemon/${i + 1}`;
      }

      //promise.all iterates through url and responses and returns an object with values
      Promise.all(url.map(u => fetch(u))).then(responses =>
        Promise.all(responses.map(res => res.json())))
        .then(pokObj => {
          //setting polemons detail
          dispatch({ type: "SET_POKEMONSDETAIL", payload: pokObj })
        }).catch(e => {
          console.log(e)
        })

    } catch (e) {
      console.log(e)
    }
  }

  //loadmore function to load 30 more function
  //runs when 'load 30 more' button is clicked
  const loadmore = async () => {
    let newPage = state.page + 30;
    dispatch({ type: "SET_NEWPAGE", payload: newPage })
    fetchIndividualPokemons(newPage);
  };

  //loadmore function to load 30 more function
  //runs when 'load all' button is clicked
  const loadall = async () => {
    fetchIndividualPokemons(905)
  }

  //Display loading screen with state.loading is true
  if (state.loading) {
    return <Loading />
  }

  //function that sets search criteria
  //runs when typed into the search bar
  const searchPokemons = (e) => {
    dispatch({ type: "SET_SEARCHCRITERIA", payload: e.target.value })
    dispatch({ type: "SET_FILTEREDARRAYFALSE" })
  }

  //creating ab object with id and type for all pokemons
  let newPokemons = state.pokemonsDetail.map((pokemon, index) => {
    return {
      ...pokemon,
      id: index + 1,
      type: state.pokemonsDetail[index].types
    }
  });


  //runs when state.searchCriteria is set
  if (state.searchCriteria) {
    //converting search array to lowercase so that its case insensitive
    let searchString = state.searchCriteria.toLowerCase();

    //filters array and returns values that matches the search string
    newPokemons = newPokemons.filter(pokemon => {
      return pokemon.name.includes(searchString) || pokemon.id.toString().includes(searchString) || pokemon.type[0].type.name.includes(searchString);
    })
  }

  //Finding all pokemons types
  let typesArray = [];
  typesArray = newPokemons.map((pokeType) => {
    return pokeType.types[0].type.name
  }
  )

  //returns unqiue set of types, omits repeated values
  let uniqueTypesArray = ["all", ...new Set(typesArray)];

  //runs when sorted by a specific type
  const sortPokemonsBy = (pokemonType) => {

    //reseting the sort to all pokemons
    if (pokemonType === "all") {
      //Sets isFiltered as false 
      dispatch({ type: "SET_FILTEREDARRAYFALSE" })
      return;
    }

    //sortedArray is set as array with specific type of pokemons
    let sortedPokemons = newPokemons.filter(pokemon => {
      return pokemon.type[0].type.name.includes(pokemonType);
    })

    //Sets isFiltered as true and filteredPokemons with sortedArray
    dispatch({ type: "SET_FILTEREDARRAY", payload: sortedPokemons })
  }

  return (
    <div className="App">
      {/* Scroll to top button */}
      <button onClick={() => { window.scrollTo(0, 0) }} className="position-fixed bottom-0 mx-5 end-0 btn btn-secondary" style={{ zIndex: "100" }}>Scroll to Top</button>
      {/* Scroll to top button */}

      {/* Search bar */}
      <div className="px-5 mt-4 d-flex align-items-stretch ">
        <label htmlFor="search" className="bg-dark text-white d-flex align-items-center px-2 rounded-start">Search</label>
        <input type="text" className="form-control rounded-0 rounded-end" value={state.searchCriteria} onChange={searchPokemons} placeholder="Search by id/name/type..." />
      </div>
      {/* Search bar */}

      {/* Types of Pokemon buttons for sorting */}
      <div className="px-5 d-flex gap-1 flex-wrap mt-4">
        {uniqueTypesArray.map((type, index) => {
          return <p key={index} onClick={(e) => { sortPokemonsBy(type, e) }} className={`py-1 px-2 type-${type} rounded-pill text-white first-letter-capital`}>{type}</p>
        })}
      </div>
      {/* Types of Pokemon buttons for sorting */}


      <div className="row px-5 py-3 g-3">

        {/* Loaded Pokemons number and load more options */}
        <div className="col-md-12 border border-top-0 border-start-0 border-end-0 pb-2">
          <div className="d-flex gap-3 flex-wrap justify-content-between align-items-end">
            {/* Displays loaded number of pokemons */}
            <p style={{ fontSize: "14px" }} className="mb-0 text-muted">Displaying {!state.isFiltered ? newPokemons.length : state.filteredArray.length} out of 905 Pokémons</p>
            {/* Displays loaded number of pokemons */}

            {/* Buttons to load more pokemons */}
            <div className="d-flex gap-1">
              <button style={{ fontSize: "12px" }} className="btn btn-dark" onClick={loadmore}>Load 30 More</button>
              <button style={{ fontSize: "12px" }} className="btn btn-dark" onClick={loadall}>Load All</button>
            </div>
            {/* Buttons to load more pokemons */}
          </div>
        </div>
        {/* Loaded Pokemons number and load more options */}

        {/* Checking for state.isFiltered */}
        {!state.isFiltered ?

          //returns this block if state.filtered is false
          //returns all pokemons irrespective of type
          newPokemons.map((pokemon) => {
            return <div key={pokemon.id} className="col-lg-4">
            <Link to={`/pokedex/pokemon/${pokemon.id}`} className="text-decoration-none">
            
              <div className="bg-dark rounded rounded-3 overflow-hidden poke-box">
                <Pokemon key={pokemon.id} id={pokemon.id} pokemon={pokemon} ></Pokemon>
              </div>
            
            </Link>
            </div>
          })
          //returns this block if state.filtered is false
          :
          //returns this block if state.filtered is true
          //returns pokemons sorted by specific type
          state.filteredArray.map((pokemon, index) => {
            return <div key={pokemon.id} className="col-lg-4" onClick={() => { window.location = `pokemon/${pokemon.id}` }}>
              <div className="bg-dark rounded rounded-3 overflow-hidden poke-box">
                <Pokemon key={pokemon.id} id={pokemon.id} pokemon={pokemon} ></Pokemon>
              </div>
            </div>
          })
          //returns this block if state.filtered is true
        }

        {/* Buttons to load more Pokemons */}
        <div className="d-flex gap-1 justify-content-center" >
          <button className="btn btn-dark" onClick={loadmore}>Load 30 More</button>
          <button className="btn btn-dark" onClick={loadall}>Load All</button>

        </div>
        {/* Buttons to load more Pokemons */}
      </div>

      <footer className="bg-dark">
        <div className="text-white px-5 py-3">
          <p className="mb-0 text-center">Gotta catch em all!</p>
        </div></footer>
    </div>
  );
}

export default App;
