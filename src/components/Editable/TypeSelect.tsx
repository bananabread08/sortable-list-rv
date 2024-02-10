import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from '../ui/select'
import { ControllerRenderProps } from 'react-hook-form'

export const TypeSelect = ({ field }: { field: ControllerRenderProps }) => {
  return (
    <Select defaultValue={field.value} onValueChange={field.onChange}>
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
