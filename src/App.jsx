import { getStarships } from './services/starshipService'
import { useState, useEffect } from 'react'
import StarshipList from './components/StarshipList/StarshipList'
import StarshipSearch from './components/StarshipSearch/StarshipSearch'


const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [starshipsData, setStarshipsData] = useState('')
  const [error, setError] = useState('')
  const [displayStarships, setDisplayStarships] = useState([])


  useEffect(() => {
    const getInitialData = async () => {
      try {
        const response = await getStarships("");
        setStarshipsData({
          name: response.data.name,
          starship_class: response.data.starship_class,
          manufacturer: response.data.manufacturer,
          model: response.data.model,
          
        });
        setDisplayStarships({
          name: response.data.name,
          starship_class: response.data.starship_class,
          manufacturer: response.data.manufacturer,
          model: response.data.model,
        })
      } catch (error) {
        // console.error(error);
       // setError(error.response.data.error.message);
      }
    }
    getInitialData()
  });
 

    const getStarshipsData = async () => {
    try {
      const response = await getStarshipsData(searchTerm)
      setStarshipsData({
        name: response.data.name,
        starship_class: response.data.starship_class,
        manufacturer: response.data.manufacturer,
        model: response.data.model,
      })
    } catch (error) {
      //console.error('Error fetching Starships', error);
     // setError(error.response.data.error.message);
    }
  }

  return (
    <>
  <h1>Star Wars API</h1>
  <h2>Search</h2>
  <section>
  <form onSubmit={getStarshipsData}>
    <label hidden htmlFor="search"></label>
    <input 
      type="search" 
      name="search" 
      id="search" 
      placeholder="Search a Starship.." 
      onChange={(error) => setSearchTerm(error.target.value)}
      value={searchTerm}
    />
    <button type="submit">Find a Starship!</button>
  </form>
</section>
  
  </>
  )}

export default App