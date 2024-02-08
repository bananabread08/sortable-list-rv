import { useState, useEffect } from 'react'
import { initialList, type TList } from '@/data'
import { useToast } from '@/components/ui/use-toast'

export const useList = () => {
  const [list, setList] = useState(initialList)
  const [editing, setEditing] = useState(false)
  const { toast } = useToast()

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
    toast({
      title: `Successfully saved ${newList.name}!`,
    })
  }

  const openEditor = () => setEditing(true)
  const cancelEdit = () => setEditing(false)

  return { list, saveList, openEditor, cancelEdit, editing }
}
