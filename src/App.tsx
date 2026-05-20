import { useEffect, useState } from 'react'
import { Dropdown, type DropdownChangeEvent } from 'primereact/dropdown'
import GridItem from './components/GridItem'
import type { CatItem } from './models/CatItem'
import type { BreedItem } from './models/BreedItem'
import FeaturedItem from './components/FeaturedItem'
import CatModal from './components/CatModal'


function App() {
  const catAPIToken = import.meta.env.VITE_CAT_API_TOKEN
  const catAPIHeaders = {
    'x-api-key': catAPIToken
  };
  const itemsPerPage = 12;
  const randomIndex = Math.floor(Math.random() * itemsPerPage);

  const [breedsList, setBreedsList] = useState<BreedItem[]>([])
  const [featuredCatItem, setFeaturedCatItem] = useState<CatItem | null>(null)
  const [catsList, setCatsList] = useState<CatItem[]>([])
  const [selectedBreedId, setSelectedBreedId] = useState<string | null>(null)
  const [selectedCatItem, setSelectedCatItem] = useState<CatItem | null>(null)

  const handleBreedChange = (e: DropdownChangeEvent) => {
    setSelectedBreedId(e.value);
    setSelectedCatItem(null);
  }

  const selectCatItem = (item: CatItem) => {
    setSelectedCatItem(item)
  }

  useEffect(() => {
    const controller = new AbortController()

    // @TODO: Refactor fetches

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
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    const params = new URLSearchParams({
      limit: itemsPerPage.toString(),
    });
    if (selectedBreedId) {
      params.append('breed_ids', selectedBreedId)
    }

    fetch(`https://api.thecatapi.com/v1/images/search?${params}`, {
      signal: controller.signal,
      headers: catAPIHeaders
    })
    .then(response => response.json())
    .then(data => {
      setCatsList(data)

      if(!featuredCatItem) {
        setFeaturedCatItem(data[randomIndex])
      }
    })
    .catch(error => {
      if (error.name !== 'AbortError') {
        throw error
      }
    });

  }, [selectedBreedId])

  return (
    <div className="bg-gray-100 content-center">
      <nav className="w-full bg-white shadow-md sticky top-0 z-50">
        <div className="container max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="assets/catstagram.png" className="logo-image h-10" alt="Catstagram" />
            <h1 className="text-lg font-semibold">Catstagram</h1>
          </div>

          <div className="flex items-center gap-4">
            <Dropdown placeholder="Select a breed"
              options={breedsList}
              optionValue="id"
              optionLabel="name"
              filterBy="name"
              dataKey="id"
              className="min-w-55"
              onChange={handleBreedChange}
              value={selectedBreedId}
            />
          </div>
        </div>
      </nav>
      <main className="container">
        <section className="featured-container my-3 flex justify-center">
          <FeaturedItem data={featuredCatItem} />
        </section>
        <section>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {catsList.map((item) => (
              <GridItem key={item.id} data={item} onClick={selectCatItem} />
            ))}
          </div>
        </section>
      </main>

      <CatModal data={selectedCatItem} onClose={() => setSelectedCatItem(null)} />
    </div>
  )
}

export default App
