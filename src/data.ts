export type ListItem = {
  name: string
  quantity: number
  id: string
}

export type TList = {
  name: string
  type: 'Grocery' | 'Home Goods' | 'Hardware'
  items: ListItem[]
}

export const initialList: TList = {
  name: 'Feb. 18, SM Supermarket',
  type: 'Grocery',
  items: [
    {
      name: 'Apples',
      quantity: 10,
      id: '1',
    },
    {
      name: 'Shampoo (500ml)',
      quantity: 1,
      id: '2',
    },
    {
      name: 'Bread',
      quantity: 1,
      id: '3',
    },
  ],
}
