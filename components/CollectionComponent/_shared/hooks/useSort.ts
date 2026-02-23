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
}

export const useSort = <CardObject extends object>({
  sortBy,
}: UseSortProps<CardObject>): UseSortReturnType<CardObject> => {
  const [currentOptionIndex, setCurrentOptionIndex] = useState<number>(0)
  const [currentSortOrders, setCurrentSortOrders] = useState<SortOrder[]>(
    sortBy.map(({defaultSortOrder}) => defaultSortOrder),
  )
  const currentOptionKey = sortBy[currentOptionIndex].key

  const setCurrentOptionKey = (key: keyof CardObject) => {
    const newKeyIndex = sortBy.findIndex((option) => option.key === key)
    setCurrentOptionIndex(newKeyIndex)
  }

  const getSorted = (cards: CardObject[]) => {
    return cards.sort((a, b) => {
      let valueA = a[currentOptionKey] as string | number
      let valueB = b[currentOptionKey] as string | number

      if (typeof valueA === 'string') {
        valueA = valueA.toUpperCase()
        valueB = (valueB as string).toUpperCase()
      }

      if (currentSortOrders[currentOptionIndex] === 'asc') {
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
    setCurrentSortOrders((previousSelection) => {
      let newSelection = [...previousSelection]
      newSelection[i] = previousSelection[i] === 'asc' ? 'desc' : 'asc'
      return newSelection
    })
  }

  const options = sortBy.map(({label, key, sortLabels}, i) => {
    return {
      label,
      key,
      sortLabel: sortLabels[currentSortOrders[i]],
      toggleOrder: () => toggleSortOrder(i),
    }
  })

  return {
    sortComponentProps: {
      options,
      currentOptionKey,
      setCurrentOptionKey,
    },
    getSorted,
  }
}
