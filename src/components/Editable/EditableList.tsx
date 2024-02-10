import { useState } from 'react'
import { type TList } from '@/data'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { EditableItem } from './EditableItem'
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { z } from 'zod'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from '../ui/select'
import { ListLabels } from '../Preview/ListLabels'
import { Save, X } from 'lucide-react'

type EditableListProps = {
  list: TList
  saveList: (newList: TList) => void
  cancelEdit: () => void
}

const itemSchema = z.object({
  name: z.string().min(1, 'Item name is required.'),
  quantity: z.coerce.number(),
  id: z.string(),
})

export const formSchema = z.object({
  name: z.string().min(1, 'List name is required.').max(30, 'Maximum of 30 characters only.'),
  type: z.union([z.literal('Grocery'), z.literal('Home Goods'), z.literal('Hardware')]),
  items: z.array(itemSchema),
})

export const EditableList = ({ list, saveList, cancelEdit }: EditableListProps) => {
  /**
   * 1. The master list will only be changed when the Save Button is clicked.
   * 2. Clicking the Cancel Button will revert all changes made.
   */
  const [editList] = useState({ ...list })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: editList.name,
      type: editList.type,
      items: editList.items.map((item) => item),
    },
  })

  const { fields, append, remove, move } = useFieldArray({
    name: 'items',
    control: form.control,
    keyName: 'uid',
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
    saveList(values)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    // active is the current dragged element
    // over is the item to be replaced.
    const { active, over } = event
    if (over && active.id !== over?.id) {
      const activeIndex = active.data.current?.sortable?.index
      const overIndex = over.data.current?.sortable?.index
      console.log({ activeIndex, overIndex })
      if (activeIndex !== undefined && overIndex !== undefined) {
        move(activeIndex, overIndex)
      }
    }
  }

  // for mobile users
  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor))

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners} sensors={sensors}>
      <section>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="bg-white rounded-md flex flex-col shadow-md"
          >
            <div className="p-2">
              <div className="flex justify-between gap-2">
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>List Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Shopping List" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <Select defaultValue={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Type</SelectLabel>
                              <SelectItem value="Grocery">Grocery</SelectItem>
                              <SelectItem value="Home Goods">Home Goods</SelectItem>
                              <SelectItem value="Hardware">Hardware</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Button
                className="w-full mt-4 bg-blue-500 hover:bg-blue-700"
                onClick={() => append({ name: '', quantity: 1, id: self.crypto.randomUUID() })}
              >
                Add an Item
              </Button>
            </div>
            <div className="m-2">
              <ListLabels />
              <div className="flex flex-col gap-1 p-2 rounded-md bg-gray-200">
                <SortableContext items={fields} strategy={verticalListSortingStrategy}>
                  {fields.map((field, index) => {
                    return (
                      <EditableItem key={field.id} form={form} field={field} index={index}>
                        <div className="basis-[3rem] px-2">
                          <Button
                            variant="destructive"
                            onClick={() => remove(index)}
                            className="h-6 w-6"
                            size="icon"
                          >
                            <X />
                          </Button>
                        </div>
                      </EditableItem>
                    )
                  })}
                </SortableContext>
              </div>
            </div>
            <hr></hr>
            <div className="self-end py-2 px-4 flex justify-between gap-2">
              <Button type="submit" className="space-x-2 bg-blue-500 hover:bg-blue-700">
                <Save />
                <span>Save Changes</span>
              </Button>
              <Button type="button" onClick={cancelEdit} variant="outline">
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </section>
    </DndContext>
  )
}
