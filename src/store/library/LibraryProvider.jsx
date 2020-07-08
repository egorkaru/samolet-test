import React, { useState, useEffect, useMemo } from 'react'

import { getData } from 'api'
import LibraryContext from 'store/library/LibraryContext'

const LibraryProvider = ({ children }) => {
  const [data, setData] = useState([])
  const [isError, setError] = useState(false)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getData()
      .then((data) => {
        setData(data)
        setError(false)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [])


  const libraryStore = useMemo(() => ({
    data,
    isError,
    isLoading,
  }), [data, isError, isLoading])

  return (
    <LibraryContext.Provider value={libraryStore}>
      {children}
    </LibraryContext.Provider>
  )
}

export default LibraryProvider
