export function todoReducer (state = null, action) {
  switch (action.type) {
    case 'TODO':
        return action.payload
    default:
        return state
  }
}
