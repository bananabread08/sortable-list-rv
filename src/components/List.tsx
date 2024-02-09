import { EditableList } from './Editable/EditableList'
import { PreviewList } from './Preview/PreviewList'
import { useList } from '../hooks/useList'

export const List = () => {
  const { list, saveList, openEditor, cancelEdit, editing } = useList()

  return editing ? (
    <EditableList list={list} saveList={saveList} cancelEdit={cancelEdit} />
  ) : (
    <PreviewList list={list} openEditor={openEditor} />
  )
}
