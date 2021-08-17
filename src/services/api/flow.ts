// TODO: move this to .env
const FLOWDATA_URL = 'https://raw.githubusercontent.com/mzronek/task/main/flow.json'

export function getData() {
  return fetch(FLOWDATA_URL)
}

const FlowService = {
  getData,
}

export default FlowService
