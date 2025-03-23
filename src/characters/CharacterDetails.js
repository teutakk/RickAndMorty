import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { GET_CHARACTERS } from '../query';
import "./CharacterDetail.css"
import { FaSkullCrossbones } from "react-icons/fa";
import { RiEmotionHappyLine } from "react-icons/ri";
import { FaQuestion } from "react-icons/fa6";
import { FormattedMessage } from 'react-intl';
import right from "./../assets/right-click.png"
import left from "./../assets/left-click.png"

const CharacterDetails = () => {

    const [page, setPage] = useState(1);
    const [characters, setCharacters] = useState([]);
    const [statusFilter, setStatusFilter] = useState("");
    const [speciesFilter, setSpeciesFilter] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [hasMore, setHasMore] = useState(true);
    const [stopInfinit, setStopInfinit] = useState(false);

    const { loading, error, data, fetchMore} = useQuery(GET_CHARACTERS, {
        variables: { 
            page,
        },
    })

    const stopingInfinit = () => {
      setStopInfinit((prev) => !prev) 
    }

    useEffect(() => {
      if(data?.characters?.results){
        setCharacters((prev) => [...prev, ...data?.characters?.results ])
        setHasMore(data.characters.info.next !== null)
      }
    }, [data])


    //sorting by name and origin
    let displayCharacters = [...characters]

    if(sortBy === "name"){
      displayCharacters.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === "origin"){
      displayCharacters.sort((a, b) => a.origin.name.localeCompare(b.origin.name))
    } 

    //filtering by species and status
    if(statusFilter){
      displayCharacters = displayCharacters.filter((char) => 
            char.status.toLowerCase() === statusFilter.toLowerCase()
        )
    }
    if(speciesFilter){
      displayCharacters = displayCharacters.filter((char) => 
            char.species.toLowerCase().includes(speciesFilter.toLowerCase())
        )
    }

    useEffect(() => {
        const handleScroll = () => {
          if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 && hasMore && !loading && !stopInfinit){
            
            setPage((prev) => prev + 1)

            fetchMore({
              variables: {page: page + 1}
            })
          }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll);
    }, [hasMore, loading, page, fetchMore, stopInfinit])
    
  return (
    <div className='characters-container'>

        <button className='button-infinit' onClick={stopingInfinit}>Stop Infinit Scrolling</button>
        <h1>Rick and Morty</h1> 
        <div className='editing-data'>

            <label>Status: </label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="">All</option>
                <option value="alive">Alive</option>
                <option value="dead">Dead</option>
                <option value="unknown">Unknown</option>
            </select>
            <label>Species: </label>
            <input 
                type='text'
                placeholder='Search Species'
                value={speciesFilter}
                onChange={(e) => setSpeciesFilter(e.target.value)}
            />
            <label>Sort</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="">Default</option>
                <option value="name">Name (A-Z)</option>
                <option value="origin">Origin (A-Z)</option>
            </select>
        </div>

        <div className='card-container'>

            {loading && <div className='loading'>Fetching data...</div>}

            {error && <div>There has been an error while fetching the data :(</div>}

            {!error && !loading && displayCharacters.map((character) => (

            <div className='inner-card' key={character.id}>
                <div className='card-details'>
                    <div className='name'><FormattedMessage id="char-name" values={{name: character.name}}  /></div>
                    <div className='status'><FormattedMessage id="char-status" values={{status: character.status}}  /></div>
                    <div className='species'><FormattedMessage id="char-species" values={{species: character.species}}  /></div>
                    <div className='gender'><FormattedMessage id="char-gender" values={{gender: character.gender}}  /></div>
                    <div className='origin'><FormattedMessage id="char-origin" values={{origin: character.origin.name}}  /></div>
                </div>
                <div className='status-icon'>
                    {character.status === "Alive" && <RiEmotionHappyLine /> }
                    {character.status === "Dead" && <FaSkullCrossbones />}
                    {character.status === "unknown" && <FaQuestion /> }
                </div>
            </div>
            ))}
        </div>
        {
          stopInfinit &&
          <div className='page-buttons'>
            {data?.characters?.info?.next && (
              <button disabled={page == 1} onClick={() => setPage(page - 1)}> 
                  {/* <img src={left} /> */}
                  Back
              </button>
            )}
            <p className='page-num'>{page}</p>
            {data?.characters?.info?.next && (
              <button onClick={() => setPage(page + 1)}>
                  {/* <img src={right} /> */}
                  Next
              </button>
            )}
          </div>
        }
    </div>
  )
}

export default CharacterDetails