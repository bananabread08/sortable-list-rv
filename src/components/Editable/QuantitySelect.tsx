import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from '../ui/select'
import { ListItem } from '@/data'

export const QuantitySelect = ({
  item,
  updateItemQuantity,
}: {
  item: ListItem
  updateItemQuantity: (id: string, value: string) => void
}) => {
  return (
    <Select
      defaultValue={item.quantity.toString()}
      onValueChange={(value) => updateItemQuantity(item.id, value)}
    >
      <SelectTrigger className="w-[80px]">
        <SelectValue placeholder="How many?" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Quantity</SelectLabel>
          {Array.from({ length: 12 }, (_, index) => index + 1).map((n) => (
            <SelectItem value={n.toString()} key={item.id + n}>
              {n}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
