import React from 'react'
import { SearchIcon } from '../../../icons/icon'

const SearchInput = () => {
  return (
    <form className='flex items-center gap-2'>
        <div className="flex  gap-2 p-5">
        <input
            className="al rounded-lg border border-grey p-2 outline-none"
          />
            <button
              className="flex w-full items-center justify-center gap-3 rounded-md border-none bg-teal p-2 py-2 text-white outline-none"
              type="submit"
            >
              <SearchIcon />
            </button>
          </div>

    </form>

  )
}

export default SearchInput