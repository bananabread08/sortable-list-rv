import { type TList } from '@/data'
import { Button } from '../ui/button'
import { PreviewItem } from './PreviewItem'
import { ListLabels } from './ListLabels'

const ListHeader = ({ name, type }: { name: string; type: string }) => {
  return (
    <div className="flex justify-between p-2">
      <div>
        <p>List Name</p>
        <h1 className="font-semibold">{name}</h1>
      </div>
      <div>
        <p>Type</p>
        <p className="font-semibold">{type}</p>
      </div>
    </div>
  )
}

export const PreviewList = ({ list, openEditor }: { list: TList; openEditor: () => void }) => {
  return (
    <section className="bg-blue-200 rounded-md flex flex-col">
      <ListHeader name={list.name} type={list.type} />
      <div className="flex flex-col gap-1 p-2">
        <ListLabels />
        {list.items.map((item) => {
          return <PreviewItem key={item.id} item={item} />
        })}
      </div>
      <hr></hr>
      <div className="self-end py-2 px-4">
        <Button onClick={openEditor}>Edit</Button>
      </div>
    </section>
  )
}
