import { IStock } from '@/shared/interfaces'

export default (): Array<IStock> => ([
  { id: 1, name: 'Facebook', price: 110 },
  { id: 2, name: 'Google', price: 200 },
  { id: 3, name: 'Apple', price: 250 },
  { id: 4, name: 'Twitter', price: 80 }
])
