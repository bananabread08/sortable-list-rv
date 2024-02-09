import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripIcon } from 'lucide-react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { ListItem } from '@/data'
import { QuantitySelect } from './QuantitySelect'

type EditableItemProps = {
  item: ListItem
  updateItemName: (id: string, value: string) => void
  updateItemQuantity: (id: string, value: string) => void
  deleteItem: (id: string) => void
}

export const EditableItem = ({
  item,
  updateItemName,
  updateItemQuantity,
  deleteItem,
}: EditableItemProps) => {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition } =
    useSortable({ id: item.id })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={style}
      className="flex flex-row justify-between items-center border border-blue-400 bg-white rounded-sm py-2 touch-none"
    >
      <div className="basis-[3rem] px-2" ref={setActivatorNodeRef} {...listeners}>
        <GripIcon />
      </div>
      <div className="flex-1">
        <Input
          className="w-fit"
          type="text"
          value={item.name}
          onChange={(e) => updateItemName(item.id, e.target.value)}
        />
      </div>
      <div className="basis-[8rem] text-center">
        <QuantitySelect item={item} updateItemQuantity={updateItemQuantity} />
      </div>
      <div className="basis-[3rem]">
        <Button variant="destructive" onClick={() => deleteItem(item.id)} className="h-6 px-2">
          X
        </Button>
      </div>
    </div>
  )
}
