import type { CatItem } from "../models/CatItem"

function FeaturedItem({ data }: { data: CatItem | null }) {
  return data ? (
    <div className="card text-center content-center">
      <img src={data.url} alt="Cat image" className="aspect-3/2 object-cover" />
      <h2>Featured Cat</h2>
    </div>
  ) : null
}

export default FeaturedItem
