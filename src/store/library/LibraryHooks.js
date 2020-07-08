import { useContext, useMemo } from 'react'

import LibraryContext from 'store/library/LibraryContext'

function useLibraryStore() {
  const store = useContext(LibraryContext)
  return store
}

function useFindLibrary(kopuk) {
  const { data, isLoading, isError } = useLibraryStore()
  const library = useMemo(() => ({
    data: data.find(library => library.kopuk === kopuk),
    isLoading,
    isError,
  }), [data, isLoading, isError, kopuk])
  return library
}

export {
  useLibraryStore,
  useFindLibrary,
}
