import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripIcon } from 'lucide-react'
import { Input } from '../ui/input'
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { formSchema } from './EditableList'
import { z } from 'zod'
import { FieldArrayWithId, UseFormReturn } from 'react-hook-form'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from '../ui/select'

type EditableItemProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>
  field: FieldArrayWithId<z.infer<typeof formSchema>>
  index: number
  children: React.ReactNode
}

export const EditableItem = ({ form, field: item, index, children }: EditableItemProps) => {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition } =
    useSortable({ id: item.id })

  // to easily inject style of draggable elements from DnD kit
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={style}
      className="flex flex-row justify-between items-center border border-r-4 border-b-2 border-b-black border-r-black border-slate-400 bg-white rounded-sm py-2 touch-none"
    >
      <div className="basis-[3rem] px-2" ref={setActivatorNodeRef} {...listeners}>
        <GripIcon />
      </div>
      <div className="flex-1">
        <FormField
          control={form.control}
          key={item.id}
          name={`items.${index}.name`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="basis-[80px] text-center ml-2">
        <FormField
          control={form.control}
          name={`items.${index}.quantity`}
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={item.quantity.toString()}>
                <FormControl>
                  <SelectTrigger className="w-[80px]">
                    <SelectValue placeholder="How many?" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Quantity</SelectLabel>
                    {Array.from({ length: 12 }, (_, index) => index + 1).map((n) => (
                      <SelectItem value={n.toString()} key={`items.${index}.quantity` + n}>
                        {n}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      {children}
    </div>
  )
}
