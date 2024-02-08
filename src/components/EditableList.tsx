import { useState } from 'react'
import { type TList } from '@/data'
import { Button } from './ui/button'

type EditableListProps = {
  list: TList
  saveList: (newList: TList) => void
  cancelEdit: () => void
}

export const EditableList = ({ list, saveList, cancelEdit }: EditableListProps) => {
  /**
   * 1. The master list will only be changed when the Save Button is clicked.
   * 2. Clicking the Cancel Button will revert all changes.
   */

  const [listCopy, setListCopy] = useState({ ...list })
  const deleteItem = (id: string) => {
    const filteredItems = listCopy.items.filter((item) => item.id !== id)
    setListCopy({ ...listCopy, items: filteredItems })
  }

  const addItem = () => {
    setListCopy({
      ...listCopy,
      items: [...listCopy.items, { name: 'New Item', quantity: 1, id: self.crypto.randomUUID() }],
    })
  }

  return (
    <section className="bg-blue-200 rounded-md flex flex-col">
      <div className="p-2">
        <div className="flex justify-between">
          <div>
            <p>List Name</p>
            <h1 className="font-semibold">{list.name}</h1>
          </div>
          <div>
            <p>Type</p>
            <p className="font-semibold">{list.type}</p>
          </div>
        </div>
        <Button className="w-full mt-4" onClick={addItem}>
          Add an Item
        </Button>
      </div>

      <div className="p-2">
        <table className="w-full">
          <thead className="text-left">
            <tr>
              <th>Item</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {listCopy.items.map((item) => {
              return (
                <tr key={item.id} className="relative">
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <Button
                      variant="destructive"
                      onClick={() => deleteItem(item.id)}
                      className="h-6 px-2"
                    >
                      X
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <hr></hr>
      <div className="self-end py-2 px-4 space-x-2">
        <Button onClick={() => saveList(listCopy)}>Save Changes</Button>
        <Button onClick={cancelEdit}>Cancel</Button>
      </div>
    </section>
  )
}
