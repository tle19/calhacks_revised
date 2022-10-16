import { MessageBuilder } from '../shared/message'
import { DEFAULT_DECK_LIST } from './../utils/constants'
const messageBuilder = new MessageBuilder()

function getTodoList() {
  return settings.settingsStorage.getItem('todoList')
    ? JSON.parse(settings.settingsStorage.getItem('todoList'))
    : [...DEFAULT_DECK_LIST]
}
AppSideService({
  onInit() {
    messageBuilder.listen(() => {})
    settings.settingsStorage.addListener(
      'change',
      ({ key, newValue, oldValue }) => {
        messageBuilder.call(getTodoList())
      },
    )
    messageBuilder.on('request', (ctx) => {
      const payload = messageBuilder.buf2Json(ctx.request.payload)
      if (payload.method === 'GET_TODO_LIST') {
        ctx.response({
          data: { result: getTodoList() },
        })
      } else if (payload.method === 'ADD') {
        const todoList = getTodoList()
        const newTodoList = [...todoList, ]
        settings.settingsStorage.setItem('todoList', JSON.stringify(newTodoList))

        ctx.response({
          data: { result: newTodoList },
        })
      } else if (payload.method === 'DELETE') {
        const { params: { index } = {} } = payload
        const todoList = getTodoList()
        const newTodoList = todoList.filter((_, i) => i !== index)
        settings.settingsStorage.setItem('todoList', JSON.stringify(newTodoList))

        ctx.response({
          data: { result: newTodoList },
        })
      }
    })
  },
  onRun() {},
  onDestroy() {},
})
