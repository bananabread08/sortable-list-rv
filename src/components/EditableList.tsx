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
import { Label } from './ui/label'
import { DndContext, DragEndEvent, UniqueIdentifier, closestCorners } from '@dnd-kit/core'
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

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
          <SelectLabel>Quantity</SelectLabel>
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

const TypeSelect = ({
  listName,
  updateListType,
}: {
  listName: string
  updateListType: (value: 'Grocery' | 'Home Goods' | 'Hardware') => void
}) => {
  return (
    <Select
      defaultValue={listName}
      onValueChange={(value: 'Grocery' | 'Home Goods' | 'Hardware') => updateListType(value)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Type</SelectLabel>
          <SelectItem value="Grocery">Grocery</SelectItem>
          <SelectItem value="Home Goods">Home Goods</SelectItem>
          <SelectItem value="Hardware">Hardware</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

const Item = ({ id, children }: { id: string; children: React.ReactNode }) => {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={style}
      className="flex flex-row justify-between items-center border border-blue-400 bg-white rounded-sm py-2"
    >
      <div className="basis-[3rem] px-2" ref={setActivatorNodeRef} {...listeners}>
        <GripIcon />
      </div>
      {children}
    </div>
  )
}

export const EditableList = ({ list, saveList, cancelEdit }: EditableListProps) => {
  /**
   * 1. The master list will only be changed when the Save Button is clicked.
   * 2. Clicking the Cancel Button will revert all changes made.
   */
  const {
    editList,
    deleteItem,
    addItem,
    updateItemQuantity,
    updateItemName,
    updateListName,
    updateListType,
    sortItems,
  } = useEditList(list)

  const handleDragEnd = (event: DragEndEvent) => {
    // active is the current dragged element
    // over is the item to be replaced.
    const { active, over } = event
    if (active.id === over?.id) return
    sortItems(active.id, over?.id as UniqueIdentifier)
  }

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
      <section className="bg-blue-200 rounded-md flex flex-col">
        <div className="p-2">
          <div className="flex justify-between">
            <div className="flex-1">
              <Label htmlFor="list-name">List Name</Label>
              <Input
                name="list-name"
                type="text"
                value={editList.name}
                onChange={(e) => updateListName(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="list-type">Type</Label>
              <TypeSelect listName={editList.type} updateListType={updateListType} />
            </div>
          </div>
          <Button className="w-full mt-4" onClick={addItem}>
            Add an Item
          </Button>
        </div>

        <div className="flex flex-col gap-1 p-2">
          <div className="flex flex-row justify-between">
            <div className="basis-[3rem]"></div>
            <div className="flex-1 uppercase font-semibold">Item</div>
            <div className="basis-[8rem] uppercase font-semibold">Quantity</div>
            <div className="basis-[3rem]"></div>
          </div>
          <SortableContext items={editList.items} strategy={verticalListSortingStrategy}>
            {editList.items.map((item) => {
              return (
                <Item key={item.id} id={item.id}>
                  <div className="flex-1">
                    <Input
                      className="w-fit"
                      type="text"
                      value={item.name}
                      onChange={(e) => updateItemName(item.id, e.target.value)}
                    />
                  </div>
                  <div className="basis-[8rem] text-center">
                    <QuantitySelect item={item} updateItem={updateItemQuantity} />
                  </div>
                  <div className="basis-[3rem]">
                    <Button
                      variant="destructive"
                      onClick={() => deleteItem(item.id)}
                      className="h-6 px-2"
                    >
                      X
                    </Button>
                  </div>
                </Item>
              )
            })}
          </SortableContext>
        </div>
        <hr></hr>
        <div className="self-end py-2 px-4 space-x-2">
          <Button onClick={() => saveList(editList)}>Save Changes</Button>
          <Button onClick={cancelEdit}>Cancel</Button>
        </div>
      </section>
    </DndContext>
  )
}
