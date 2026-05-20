import type { CatItem } from "../models/CatItem"

function GridItem({ data }: { data: CatItem }) {
  return (
    <div className='card'>
        <img src={data.url} alt="Cat image" />
    </div>
  )
}

export default GridItem
