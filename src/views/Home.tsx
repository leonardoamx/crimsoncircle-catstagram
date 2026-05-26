import { useEffect, useState } from 'react'
import { requestCatData } from '../services/CatAPIService'
import { Dropdown, type DropdownChangeEvent } from 'primereact/dropdown'
import GridItem from '../components/GridItem'
import FeaturedItem from '../components/FeaturedItem'
import CatModal from '../components/CatModal'
import type { CatItem } from '../models/CatItem'
import type { BreedItem } from '../models/BreedItem'
import { ProgressSpinner } from 'primereact/progressspinner'
import LoginModal from '../components/LoginModal'
import { useAuth } from '../contexts/AuthContext'


function Home() {
  const itemsPerPage = 24;
  const randomIndex = Math.floor(Math.random() * itemsPerPage);

  const authContext = useAuth();

  const [showLogin, setShowLogin] = useState(!authContext.token);
  const [breedsList, setBreedsList] = useState<BreedItem[]>([])
  const [featuredCatItem, setFeaturedCatItem] = useState<CatItem | null>(null)
  const [catsList, setCatsList] = useState<CatItem[]>([])
  const [selectedBreedId, setSelectedBreedId] = useState<string | null>(null)
  const [selectedCatItem, setSelectedCatItem] = useState<CatItem | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handleBreedChange = (e: DropdownChangeEvent) => {
    setSelectedBreedId(e.value);
    setSelectedCatItem(null);
  }

  const selectCatItem = (item: CatItem) => {
    setSelectedCatItem(item)
  }

  useEffect(() => {
    requestCatData('/breeds')
    .then((data: BreedItem[]) => setBreedsList(data));
  }, [])

  useEffect(() => {
    const params = new URLSearchParams({
      limit: itemsPerPage.toString(),
      page: '0'
    });
    if (selectedBreedId) {
      params.append('breed_ids', selectedBreedId)
    }

    setLoading(true)
    requestCatData(`/images/search?${params}`)
    .then((data: CatItem[]) => {
      setCatsList(data)
      setLoading(false)

      if(!featuredCatItem) {
        setFeaturedCatItem(data[randomIndex])
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
          <button onClick={() => setShowLogin(true)} disabled={showLogin} className='bg-blue-500 text-white rounded px-4 py-2 disabled:opacity-50'>
            Login
          </button>
        </div>
      </nav>
      <main className="container min-h-screen">
        <section className="featured-container my-4 flex justify-center w-full md:w-3/4 mx-auto">
          <FeaturedItem data={featuredCatItem} onClick={selectCatItem} />
        </section>
        <section>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {catsList.map((item) => (
              <GridItem key={item.id} data={item} onClick={selectCatItem} />
            ))}
          </div>
          <div className='flex justify-center'>
            {loading && <ProgressSpinner className='w-10 h-10' />}
          </div>
        </section>
      </main>

      <LoginModal show={showLogin} onClose={() => setShowLogin(false)} />
      <CatModal data={selectedCatItem} onClose={() => setSelectedCatItem(null)} />
    </div>
  )
}

export default Home
