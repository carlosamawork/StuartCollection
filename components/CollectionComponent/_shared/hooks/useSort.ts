import {SortComponentOption} from '@/components/CollectionComponent/_shared/components/SortComponent'
import {Dispatch, SetStateAction, useEffect, useMemo, useState} from 'react'

type SortOrder = 'asc' | 'desc'

type SortBy<CardObject extends object> = {
  label: string
  key: keyof CardObject // key in the CardObject that should be used for sorting
  sortLabels: Record<SortOrder, string>
  defaultSortOrder: SortOrder
}

interface UseSortProps<CardObject extends object> {
  sortBy: SortBy<CardObject>[]
  initialSortKey: keyof CardObject
}

interface UseSortReturnType<CardObject extends object> {
  sortComponentOptions: SortComponentOption<CardObject>[]
  getSorted: (cards: CardObject[]) => CardObject[]
  selectedSortOrder: SortOrder
  selectedSortKey: keyof CardObject
  setSelectedSortKey: Dispatch<SetStateAction<keyof CardObject>>
}

export const useSort = <CardObject extends object>({
  sortBy,
  initialSortKey,
}: UseSortProps<CardObject>): UseSortReturnType<CardObject> => {
  const [selectedSortKey, setSelectedSortKey] = useState<keyof CardObject>(initialSortKey)

  const selectedSortOption = useMemo<SortBy<CardObject>>(
    () => sortBy.find((option) => option.key === selectedSortKey) ?? sortBy[0],
    [selectedSortKey],
  )

  const [selectedSortOrder, setSortOrder] = useState<SortOrder>(selectedSortOption.defaultSortOrder)

  const resetSortOrder = () => {
    setSortOrder(selectedSortOption.defaultSortOrder)
  }

  useEffect(() => {
    resetSortOrder()
  }, [selectedSortKey])

  const getSorted = (cards: CardObject[]) => {
    return cards.sort((a, b) => {
      let valueA = a[selectedSortKey] as string | number
      let valueB = b[selectedSortKey] as string | number

      if (typeof a[selectedSortKey] === 'string') {
        valueA = (valueA as string).toUpperCase()
        valueB = (valueB as string).toUpperCase()
      }

      if (selectedSortOrder === 'asc') {
        if (valueA < valueB) {
          return -1
        }
        if (valueA < valueB) {
          return 1
        }
        return 0
      }

      if (valueA > valueB) {
        return -1
      }
      if (valueA < valueB) {
        return 1
      }
      return 0
    })
  }

  const toggleSortOrder = () => {
    setSortOrder((previousValue) => (previousValue === 'asc' ? 'desc' : 'asc'))
  }

  const sortComponentOptions = sortBy.map(({label, key, sortLabels}) => {
    return {
      label,
      key,
      sortLabel: sortLabels[selectedSortOrder],
      toggleOrder: toggleSortOrder,
    }
  })

  return {
    sortComponentOptions,
    getSorted,
    selectedSortOrder,
    selectedSortKey,
    setSelectedSortKey,
  }
}
