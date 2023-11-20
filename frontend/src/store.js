import { createStore } from 'redux';

function reducer (state, action) {
    const newState = {...state}
    if (state == undefined) {
        return {
            user: {
                name: '',
                email: '',
                id: '',
                roll : ''
            }
        }
    }
    if (action.type === 'LOGIN') {
        newState.user.name = action.name
        newState.user.email = action.email
        newState.user.id = action.id
        newState.user.roll = action.roll
    }
    if (action.type === 'LOGOUT') {
        newState.user.name = ''
        newState.user.email = ''
        newState.user.idx = ''
        newState.user.roll = ''
    }
    return newState
}

const store = createStore(reducer)
export default store;