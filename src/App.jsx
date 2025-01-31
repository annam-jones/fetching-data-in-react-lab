import { getStarships } from './services/starshipService'
import { useState, useEffect } from 'react'
import StarshipList from './components/StarshipList/StarshipList'
import StarshipSearch from './components/StarshipSearch/StarshipSearch'
import axios from 'axios'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [starshipsData, setStarshipsData] = useState([])
  const [error, setError] = useState('')
  const [displayStarships, setDisplayStarships] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getInitialData = async () => {
      try {
        const response = await getStarships();
        console.log(response);
        setStarshipsData(response.data.results);
        setDisplayStarships(response.data.results);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    };
    getInitialData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    try {
      const response = await getStarships(searchTerm)
      setStarshipsData(response.data.results)
      setSearchTerm("")
    } catch (error) {
      console.error('Error fetching Starships');
     setError(error.message);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
  <h1>Star Wars API</h1>
  <h2>Search</h2>
  <section>
  <form onSubmit={handleSubmit}>
    <label hidden htmlFor="search"></label>
    <input 
      type="search" 
      name="search" 
      id="search" 
      placeholder="Search a Starship.." 
      onChange={(event) => setSearchTerm(event.target.value)}
      value={searchTerm}
    />
    <button type="submit">Find a Starship!</button>
    <button onClick={() => setDisplayStarships}>Show All</button>
  </form>
  <StarshipList starships={starshipsData}/>
</section>
  
  </>
  )}

export default App