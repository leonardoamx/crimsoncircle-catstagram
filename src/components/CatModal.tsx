import type { CatItem } from "../models/CatItem"
import { type KeyboardEvent, type MouseEvent } from 'react'

type GridItemProps = {
  data: CatItem | null
  onClose?: () => void
}

function CatModal({ data, onClose }: GridItemProps) {
  if (!data) {
    return null;
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClose?.()
    }
  }

  let title = '';
  let description = 'No information available at the moment, we are working on it :)';
  let breedsList = []

  if (data.breeds?.length > 0) {
    breedsList = data.breeds.map(breed => breed.name);

    title = breedsList.length > 1 ? 'Breeds: ' : 'Breed: ';
    title += breedsList.join(', ')

    description = data.breeds[0]?.description || description
  }

  const handleBackdropClick = () => {
    onClose?.()
  }

  const stopPropagation = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center" onClick={handleBackdropClick}>
      <div className="bg-white p-3 md:rounded shadow-lg w-full md:w-1/2" onClick={stopPropagation}>
        <div className="w-full flex justify-end">
          <button
            className="bg-gray-200 rounded px-1 mb-2"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={handleKeyDown}
          >
            Cerrar
          </button>
        </div>
        <img src={data.url} alt="Cat image" className="aspect-3/2 object-cover mb-4 w-full" />
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <p className="mb-4">{description}</p>
      </div>
    </div>
  )
}

export default CatModal
