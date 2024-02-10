import { ListItem } from '@/data'

export const PreviewItem = ({ item }: { item: ListItem }) => {
  return (
    <div
      className="flex flex-row justify-between border border-r-4 border-b-2 border-b-black border-r-black border-slate-400 bg-white rounded-sm py-2"
      key={item.id}
    >
      <div className="basis-[3rem]"></div>
      <div className="flex-1">{item.name}</div>
      <div className="basis-[80px] text-center">{item.quantity}</div>
      <div className="basis-[3rem]"></div>
    </div>
  )
}
