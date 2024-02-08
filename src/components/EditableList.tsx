import { ListItem, type TList } from '@/data'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { GripIcon } from 'lucide-react'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from './ui/select'
import { useEditList } from './hooks/useEditList'

type EditableListProps = {
  list: TList
  saveList: (newList: TList) => void
  cancelEdit: () => void
}

const QuantitySelect = ({
  item,
  updateItem,
}: {
  item: ListItem
  updateItem: (id: string, value: string) => void
}) => {
  return (
    <Select
      defaultValue={item.quantity.toString()}
      onValueChange={(value) => updateItem(item.id, value)}
    >
      <SelectTrigger className="w-[80px]">
        <SelectValue placeholder="How many?" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          {Array.from({ length: 12 }, (_, index) => index + 1).map((n) => (
            <SelectItem value={n.toString()} key={item.id + n}>
              {n}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

const Item = ({ children }: { children: React.ReactNode }) => {
  return (
    <tr className="relative">
      <td>
        <GripIcon size={16} />
      </td>
      {children}
    </tr>
  )
}

export const EditableList = ({ list, saveList, cancelEdit }: EditableListProps) => {
  /**
   * 1. The master list will only be changed when the Save Button is clicked.
   * 2. Clicking the Cancel Button will revert all changes.
   */
  const { editList, deleteItem, addItem, updateItemQuantity, updateItemName } = useEditList(list)

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
        <table className="w-full border-separate border-spacing-y-2">
          <thead className="text-left uppercase">
            <tr>
              <th></th>
              <th>Item</th>
              <th>Quantity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {editList.items.map((item) => {
              return (
                <Item key={item.id}>
                  <td>
                    <Input
                      className="w-fit"
                      type="text"
                      value={item.name}
                      onChange={(e) => updateItemName(item.id, e.target.value)}
                    />
                  </td>
                  <td>
                    <QuantitySelect item={item} updateItem={updateItemQuantity} />
                  </td>
                  <td>
                    <Button
                      variant="destructive"
                      onClick={() => deleteItem(item.id)}
                      className="h-6 px-2"
                    >
                      X
                    </Button>
                  </td>
                </Item>
              )
            })}
          </tbody>
        </table>
      </div>
      <hr></hr>
      <div className="self-end py-2 px-4 space-x-2">
        <Button onClick={() => saveList(editList)}>Save Changes</Button>
        <Button onClick={cancelEdit}>Cancel</Button>
      </div>
    </section>
  )
}
