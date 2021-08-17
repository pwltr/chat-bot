// TODO: move this to .env
const API_URL = 'https://virtserver.swaggerhub.com/L8475/task/1.0.0/conversation'

type TAnswer = {
  name: string
  value: string | number | boolean
}

export function sendAnswers(answers: TAnswer[]) {
  return fetch(API_URL, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(answers),
  })
}

const ConversationService = {
  sendAnswers,
}

export default ConversationService
