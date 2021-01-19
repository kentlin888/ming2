let root = document.querySelector('#root')
root.innerHTML = 'AAAA'

//console.log(Redux.createStore)

let store = Redux.createStore(counter);

//action
let action = {
    type: 'addUserNubmer',
    data: 5
}
store.dispatch(action)

store.dispatch(action)
store.dispatch(action)


let state = store.getState();
console.log(state)

// reducer
function counter(state = 0, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1
        case 'addUserNubmer':
            return state + action.data
        default:
            return state
    }
}