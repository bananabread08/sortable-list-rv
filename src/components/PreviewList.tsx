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
      <div className="p-2">
        <table className="w-full border-separate border-spacing-y-2">
          <thead className="text-left uppercase">
            <tr>
              <th>&nbsp;</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {list.items.map((item) => {
              return (
                <tr key={item.id}>
                  <td className="w-5"></td>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td className="w-5"></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <hr></hr>
      <div className="self-end py-2 px-4">
        <Button onClick={openEditor}>Edit</Button>
      </div>
    </section>
  )
}
