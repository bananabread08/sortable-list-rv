import { ListItem } from '@/data'

export const PreviewItem = ({ item }: { item: ListItem }) => {
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
}
