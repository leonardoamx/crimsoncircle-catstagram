import type { CatItem } from "../models/CatItem"

function GridItem({ data }: { data: CatItem }) {
  return (
    <div className='card my-2'>
        <img src={data.url} alt="Cat image" className='aspect-3/2 object-cover' />
    </div>
  )
}

export default GridItem
