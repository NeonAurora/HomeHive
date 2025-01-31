import React from 'react'
import { HiLocationMarker } from 'react-icons/hi'
import './Search.css'

const Search = () => {
  return (
   <div className="flexCenter search-bar">
               <HiLocationMarker color="#FF8000" size={25} />
               <input type="text" />
               <button className="button">Search</button>
             </div>
  )
}

export default Search