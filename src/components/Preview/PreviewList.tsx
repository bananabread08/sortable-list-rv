import { type TList } from '@/data'
import { Button } from '../ui/button'
import { PreviewItem } from './PreviewItem'
import { ListLabels } from './ListLabels'
import { Pencil } from 'lucide-react'
import { cn } from '@/lib/utils'

const ListHeader = ({ name, type }: { name: string; type: string }) => {
  return (
    <div className="flex justify-between p-2">
      <div className="flex flex-col gap-2">
        <h1 className="px-2 py-1 rounded font-semibold">{name}</h1>
      </div>
      <div className="flex flex-col gap-2">
        <div className="px-2 py-1 rounded flex gap-2 items-center">
          <div
            className={cn(
              'w-6 h-6 rounded-full',
              type === 'Grocery' && 'bg-pink-400',
              type === 'Home Goods' && 'bg-purple-400',
              type === 'Hardware' && 'bg-emerald-400',
            )}
          ></div>
          <span>{type}</span>
        </div>
      </div>
    </div>
  )
}

export const PreviewList = ({ list, openEditor }: { list: TList; openEditor: () => void }) => {
  return (
    <section className="bg-white rounded-md flex flex-col shadow-md overflow-hidden">
      <ListHeader name={list.name} type={list.type} />
      <div className="flex flex-col gap-1 p-2">
        <ListLabels />
        <div className="m-2 flex flex-col gap-2">
          {list.items.map((item) => {
            return <PreviewItem key={item.id} item={item} />
          })}
        </div>
      </div>
      <hr></hr>
      <div className="self-end py-2 px-4">
        <Button onClick={openEditor} className="space-x-2 bg-blue-500 hover:bg-blue-700">
          <Pencil />
          <span>Edit</span>
        </Button>
      </div>
    </section>
  )
}
