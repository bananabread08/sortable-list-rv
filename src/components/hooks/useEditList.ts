import { TList } from '@/data'
import { UniqueIdentifier } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useState } from 'react'

export const useEditList = (list: TList) => {
  const [editList, setEditList] = useState({ ...list })
  const deleteItem = (id: string) => {
    console.log(editList)
    const filteredItems = editList.items.filter((item) => item.id !== id)
    setEditList({ ...editList, items: filteredItems })
  }

  const addItem = () => {
    setEditList({
      ...editList,
      items: [...editList.items, { name: 'New Item', quantity: 1, id: self.crypto.randomUUID() }],
    })
  }

  const updateItemQuantity = (id: string, value: string) => {
    const newItems = editList.items.map((item) =>
      item.id === id ? { ...item, quantity: parseInt(value) } : item,
    )
    setEditList({ ...editList, items: newItems })
  }

  const updateItemName = (id: string, value: string) => {
    const newItems = editList.items.map((item) =>
      item.id === id ? { ...item, name: value } : item,
    )
    setEditList({ ...editList, items: newItems })
  }

  const updateListName = (value: string) => {
    setEditList({ ...editList, name: value })
  }

  const updateListType = (value: 'Grocery' | 'Home Goods' | 'Hardware') => {
    setEditList({ ...editList, type: value })
  }

  const getItemPosition = (id: UniqueIdentifier) =>
    editList.items.findIndex((item) => id == item.id)

  const sortItems = (activeId: UniqueIdentifier, overId: UniqueIdentifier) => {
    const originalPosition = getItemPosition(activeId)
    const newPosition = getItemPosition(overId)
    setEditList((prev) => {
      return { ...prev, items: arrayMove(prev.items, originalPosition, newPosition) }
    })
  }

  return {
    editList,
    deleteItem,
    addItem,
    updateItemQuantity,
    updateItemName,
    updateListName,
    updateListType,
    sortItems,
  }
}
