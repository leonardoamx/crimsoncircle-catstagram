import { Ripple } from "primereact/ripple"
import type { CatItem } from "../models/CatItem"
import type { KeyboardEvent } from 'react'

type GridItemProps = {
  data: CatItem
  onClick?: (item: CatItem) => void
}

function GridItem({ data, onClick }: GridItemProps) {
  const handleClick = () => onClick?.(data)

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick?.(data)
    }
  }

  return (
    <div
      className="card my-2 cursor-pointer p-ripple"
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <Ripple />
      <img src={data.url} alt="Cat image" className="aspect-3/2 object-contain" />
    </div>
  )
}

export default GridItem
