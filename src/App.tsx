import { useEffect, useState } from 'react'
import { Dropdown } from 'primereact/dropdown'
import GridItem from './components/GridItem'
import type { CatItem } from './models/CatItem'
import type { BreedItem } from './models/BreedItem'
import FeaturedItem from './components/FeaturedItem'


function App() {
  const catAPIToken = import.meta.env.VITE_CAT_API_TOKEN
  const catAPIHeaders = {
    'x-api-key': catAPIToken
  };

  const [breedsList, setBreedsList] = useState<BreedItem[]>([])
  const [featuredCatItem, setFeaturedCatItem] = useState<CatItem | null>(null)
  const [catsList, setCatsList] = useState<CatItem[]>([])

  useEffect(() => {
    const controller = new AbortController()

    fetch('https://api.thecatapi.com/v1/breeds', {
      signal: controller.signal,
      headers: catAPIHeaders
    })
      .then(response => response.json())
      .then(data => setBreedsList(data))
      .catch(error => {
        if (error.name !== 'AbortError') {
          throw error
        }
      });

    fetch('https://api.thecatapi.com/v1/images/search', {
      signal: controller.signal,
      headers: catAPIHeaders
    })
      .then(response => response.json())
      .then(data => setFeaturedCatItem(data[0]))
      .catch(error => {
        if (error.name !== 'AbortError') {
          throw error
        }
      });

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
      });

  }, [])

  return (
    <>
      <nav>
        <img src="http://dummyimage.com/200x100?text=Catstagram" className="logo" alt="Catstagram" />
        <Dropdown placeholder='Select a breed'
          options={breedsList}
          optionValue="id"
          optionLabel="name"
          filterBy="name"
          dataKey="id"
        />
      </nav>
      <main>
        <section className='featured-container'>
          <FeaturedItem data={featuredCatItem} />
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
