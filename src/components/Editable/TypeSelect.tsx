import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from '../ui/select'

export const TypeSelect = ({
  listName,
  updateListType,
}: {
  listName: string
  updateListType: (value: 'Grocery' | 'Home Goods' | 'Hardware') => void
}) => {
  return (
    <Select
      defaultValue={listName}
      onValueChange={(value: 'Grocery' | 'Home Goods' | 'Hardware') => updateListType(value)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Type</SelectLabel>
          <SelectItem value="Grocery">Grocery</SelectItem>
          <SelectItem value="Home Goods">Home Goods</SelectItem>
          <SelectItem value="Hardware">Hardware</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
