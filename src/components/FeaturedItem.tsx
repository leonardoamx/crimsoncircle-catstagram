import type { CatItem } from "../models/CatItem"

function FeaturedItem({ data }: { data: CatItem | null }) {
  return data ? (
    <div className='card'>
      <img src={data.url} alt="Cat image" />
      <h2>Featured Cat</h2>
    </div>
  ) : null
}

export default FeaturedItem
