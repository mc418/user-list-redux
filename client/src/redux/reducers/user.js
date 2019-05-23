const initState = {
    data: {},
    error: null
}

const user = (state=initState, action) => {
    switch(action.type) {
        case 'GET_USER_REQUEST': 
            return {
                ...state
            }
        case 'GET_USER_SUCCESS':
            return {
                ...state,
                data: action.data
            }
        case 'GET_USER_FAIL':
            return {
                ...state,
                error: action.error
            }
        default:
            return state
    }
}

export default user;