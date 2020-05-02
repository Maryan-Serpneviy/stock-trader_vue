import Vue from 'vue'
import Vuex from 'vuex'

import data from '@/services/data'
import service from '@/services'
import { IStock, IPortfolioStock } from '@/shared/interfaces'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    stocks: data(),
    portfolio: [] as Array<IPortfolioStock>,
    credits: 1000
  },
  getters: {
    stocks: state => state.stocks,
    portfolio: state => state.portfolio,
    credits: state => state.credits,
    data: state => ({
      stocks: state.stocks,
      portfolio: state.portfolio,
      credits: state.credits
    })
  },
  mutations: {
    buyStock(state, payload: IPortfolioStock) {
      const exist = state.portfolio.find(el => el.id === payload.id)

      if (exist) {
        exist.amount += payload.amount
      } else {
        state.portfolio.push(payload)
      }
      state.credits -= payload.price * payload.amount
    },

    sellStock(state, payload: IPortfolioStock) {
      const exist = state.portfolio.find(el => el.id === payload.id)

      if (exist.amount > payload.amount) {
        exist.amount -= payload.amount
      } else {
        state.portfolio.splice(state.portfolio.indexOf(exist), 1)
      }
      state.credits += payload.price * payload.amount
    },

    randomizeStocks(state) {
      const coef = 1 + Math.random() - 0.5
      const calculatePrice = (stock: IStock): number => {
        return Math.round(stock.price * coef)
      }

      state.stocks.forEach(stock => {
        stock.price = calculatePrice(stock)
      })
      state.portfolio.forEach(stock => {
        stock.price = calculatePrice(stock)
      })
    },

    loadStocks(state, payload) {
      state.stocks = payload.stocks
      state.portfolio = payload.portfolio || []
      state.credits = payload.credits
    }
  },
  actions: {
    buy(store, payload) {
      store.commit('buyStock', payload)
    },
    sell(store, payload) {
      store.commit('sellStock', payload)
    },
    endDay(store) {
      store.commit('randomizeStocks')
    },
    async load(store): Promise<object> {
      const response = await service.get('data.json')
      if (response.statusText == 'OK' && response.data) {
        store.commit('loadStocks', response.data)
      }
      return response
    }
  }
})
