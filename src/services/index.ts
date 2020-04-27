import axios from 'axios'

const baseURL = 'https://stock-trader-vue-a6011.firebaseio.com/'

export default axios.create({
  baseURL,
  timeout: 1000
})
