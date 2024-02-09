import { type TList } from '@/data'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useEditList } from '@/hooks/useEditList'
import { Label } from '../ui/label'
import { TypeSelect } from './TypeSelect'
import { EditableItem } from './EditableItem'
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  UniqueIdentifier,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

type EditableListProps = {
  list: TList
  saveList: (newList: TList) => void
  cancelEdit: () => void
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

  // for mobile users
  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor))

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners} sensors={sensors}>
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
                <EditableItem
                  key={item.id}
                  item={item}
                  updateItemName={updateItemName}
                  updateItemQuantity={updateItemQuantity}
                  deleteItem={deleteItem}
                />
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
