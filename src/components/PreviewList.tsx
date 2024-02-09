import { type TList } from '@/data'
import { Button } from './ui/button'

export const PreviewList = ({ list, openEditor }: { list: TList; openEditor: () => void }) => {
  return (
    <section className="bg-blue-200 rounded-md flex flex-col">
      <div className="flex justify-between p-2">
        <div>
          <p>List Name</p>
          <h1 className="font-semibold">{list.name}</h1>
        </div>
        <div>
          <p>Type</p>
          <p className="font-semibold">{list.type}</p>
        </div>
      </div>

      <div className="flex flex-col gap-1 p-2">
        <div className="flex flex-row justify-between">
          <div className="basis-[3rem]"></div>
          <div className="flex-1 uppercase font-semibold">Item</div>
          <div className="basis-[8rem] uppercase font-semibold text-center">Quantity</div>
          <div className="basis-[3rem]"></div>
        </div>
        {list.items.map((item) => {
          return (
            <div
              className="flex flex-row justify-between border border-blue-400 bg-white rounded-sm py-2"
              key={item.id}
            >
              <div className="basis-[3rem]"></div>
              <div className="flex-1">{item.name}</div>
              <div className="basis-[8rem] text-center">{item.quantity}</div>
              <div className="basis-[3rem]"></div>
            </div>
          )
        })}
      </div>
      <hr></hr>
      <div className="self-end py-2 px-4">
        <Button onClick={openEditor}>Edit</Button>
      </div>
    </section>
  )
}
