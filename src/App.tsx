import { useEffect, useState } from 'react'
import { Dropdown } from 'primereact/dropdown'
import GridItem from './components/GridItem'
import type { CatItem } from './models/CatItem'


function App() {
  const catAPIToken = import.meta.env.VITE_CAT_API_TOKEN
  const catAPIHeaders = {
    'x-api-key': catAPIToken
  };
  const [catsList, setCatsList] = useState<CatItem[]>([])

  useEffect(() => {
    const controller = new AbortController()

    fetch('https://api.thecatapi.com/v1/images/search?limit=12', {
      signal: controller.signal,
      headers: catAPIHeaders
    })
      .then(response => response.json())
      .then(data => setCatsList(data))
      .catch(error => {
        if (error.name !== 'AbortError') {
          throw error
        }
      })
  }, [])

  return (
    <>
      <nav>
        <img src="http://dummyimage.com/200x100?text=Catstagram" className="logo" alt="Catstagram" />
        <Dropdown placeholder='Select a breed' />
      </nav>
      <main>
        <section className='featured-container'>
          <div className='card'>
            <img src="https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg" alt="A cute cat" />
            <h2>Featured Cat</h2>
          </div>
        </section>
        <section>
          <div className='grid-container'>
            {catsList.map((item) => (
              <GridItem key={item.id} data={item} />
            ))}
          </div>
        </section>
      </main>
    </>
  )
}

export default App
