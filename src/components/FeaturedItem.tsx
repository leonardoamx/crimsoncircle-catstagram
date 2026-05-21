import { Ripple } from "primereact/ripple"
import type { CatItem } from "../models/CatItem"
import type { KeyboardEvent } from "react"

type FeaturedItemProps = {
  data: CatItem | null
  onClick?: (item: CatItem) => void
}

function FeaturedItem({ data, onClick }: FeaturedItemProps) {
  const handleClick = () => onClick?.(data!)

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick?.(data!)
    }
  }

  return data && (
    <div
      className="card text-center bg-white shadow rounded overflow-hidden cursor-pointer p-ripple"
      role="button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <img src={data.url || '/assets/placeholder.png'} alt="Cat image" className="aspect-3/2 object-cover" />
      <h2>Featured Cat</h2>
      <Ripple />
    </div>
  )
}

export default FeaturedItem
