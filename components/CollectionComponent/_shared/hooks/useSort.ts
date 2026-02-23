import {SortComponentProps} from '@/components/CollectionComponent/_shared/components/SortComponent'
import {useState} from 'react'

type SortOrder = 'asc' | 'desc'

type SortBy<CardObject extends object> = {
  label: string
  key: keyof CardObject // key in the CardObject that should be used for sorting
  sortLabels: Record<SortOrder, string>
  defaultSortOrder: SortOrder
}

interface UseSortProps<CardObject extends object> {
  sortBy: SortBy<CardObject>[]
}

interface UseSortReturnType<CardObject extends object> {
  sortComponentProps: SortComponentProps<CardObject>
  getSorted: (cards: CardObject[]) => CardObject[]
  selectedSortOrder: SortOrder
}

export const useSort = <CardObject extends object>({
  sortBy,
}: UseSortProps<CardObject>): UseSortReturnType<CardObject> => {
  const [currentOptionIndex, setCurrentOptionIndex] = useState<number>(0)
  const [orderSelection, setOrderSelection] = useState<SortOrder[]>(
    sortBy.map(({defaultSortOrder}) => defaultSortOrder),
  )

  const selectedSortKey = sortBy[currentOptionIndex].key
  const setSelectedSortKey = (key: keyof CardObject) => {
    const newKeyIndex = sortBy.findIndex((option) => option.key === key)
    setCurrentOptionIndex(newKeyIndex)
  }
  const selectedSortOrder = orderSelection[currentOptionIndex]

  const getSorted = (cards: CardObject[]) => {
    return cards.sort((a, b) => {
      let valueA = a[selectedSortKey] as string | number
      let valueB = b[selectedSortKey] as string | number

      if (typeof valueA === 'string') {
        valueA = valueA.toUpperCase()
        valueB = (valueB as string).toUpperCase()
      }

      if (orderSelection[currentOptionIndex] === 'asc') {
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

  const toggleSortOrder = (i: number) => {
    setOrderSelection((previousSelection) => {
      let newSelection = [...previousSelection]
      newSelection[i] = previousSelection[i] === 'asc' ? 'desc' : 'asc'
      return newSelection
    })
  }

  const sortOptions = sortBy.map(({label, key, sortLabels}, i) => {
    return {
      label,
      key,
      sortLabel: sortLabels[orderSelection[i]],
      toggleOrder: () => toggleSortOrder(i),
    }
  })

  return {
    sortComponentProps: {
      sortOptions,
      selectedSortKey,
      setSelectedSortKey,
    },
    getSorted,
    selectedSortOrder,
  }
}
