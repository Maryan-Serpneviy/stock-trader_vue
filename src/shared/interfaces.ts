export interface IStock {
  id: number
  name: string
  price: number
}

export interface IPortfolioStock extends IStock {
  amount: number
}
