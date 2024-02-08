import { TList } from '@/data'
import { useState } from 'react'

export const useEditList = (list: TList) => {
  const [editList, setEditList] = useState({ ...list })
  const deleteItem = (id: string) => {
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

  return { editList, deleteItem, addItem, updateItemQuantity, updateItemName }
}
