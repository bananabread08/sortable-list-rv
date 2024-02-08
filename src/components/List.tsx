import { useEffect, useState } from 'react'
import { EditableList } from './EditableList'
import { PreviewList } from './PreviewList'
import { initialList, type TList } from '@/data'

export const List = () => {
  const [list, setList] = useState(initialList)
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    const storageList = JSON.parse(localStorage.getItem('shopping-list')!)
    if (storageList) {
      setList(storageList)
    }
  }, [])

  const saveList = (newList: TList) => {
    setList(newList)
    localStorage.setItem('shopping-list', JSON.stringify(newList))
    setEditing(false)
  }

  const openEditor = () => setEditing(true)
  const cancelEdit = () => setEditing(false)

  return editing ? (
    <EditableList list={list} saveList={saveList} cancelEdit={cancelEdit} />
  ) : (
    <PreviewList list={list} openEditor={openEditor} />
  )
}
