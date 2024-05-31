import axios from 'axios'
import ePaycoConfig from 'Config/epayco'

const ePayco = axios.create({
  baseURL: 'https://dquintero1460985.epayco.me',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  auth: {
    username: ePaycoConfig.apiKey,
    password: ePaycoConfig.privateKey,
  },
})

export default ePayco