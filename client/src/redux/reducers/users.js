const initState = {
    data: [],
    error: null
}

const users = (state=initState, action) => {
    switch(action.type) {
        case 'GET_ADD_USER_REQUEST': 
            return {
                ...state
            }
        case 'GET_ADD_USER_SUCCESS':
            return {
                ...state,
                data: action.data
            }
        case 'GET_ADD_USER_FAIL':
            return {
                ...state,
                error: action.error
            }
        case 'GET_EDIT_USER_REQUEST': 
            return {
                ...state
            }
        case 'GET_EDIT_USER_SUCCESS':
            return {
                ...state,
                data: action.data
            }
        case 'GET_EDIT_USER_FAIL':
            return {
                ...state,
                error: action.error
            }
        case 'GET_SEARCH_USER_REQUEST': 
            return {
                ...state
            }
        case 'GET_SEARCH_USER_SUCCESS':
            return {
                ...state,
                data: action.data
            }
        case 'GET_SEARCH_USER_FAIL':
            return {
                ...state,
                error: action.error
            }
        case 'GET_USERS_REQUEST': 
            return {
                ...state
            }
        case 'GET_USERS_SUCCESS':
            return {
                ...state,
                data: action.data
            }
        case 'GET_USERS_FAIL':
            return {
                ...state,
                error: action.error
            }
        case 'GET_DELETE_USERS_REQUEST': 
            return {
                ...state
            }
        case 'GET_DELETE_USERS_SUCCESS':
            return {
                ...state,
                data: action.data
            }
        case 'GET_DELETE_USERS_FAIL':
            return {
                ...state,
                error: action.error
            }
        default:
            return state
    }
}

export default users;