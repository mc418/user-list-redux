import axios from 'axios';

const getAddUserRequest = () => {
    return {
        type: "GET_ADD_USER_REQUEST"
    };
};

const getAddUserSuccess = (data) => {
    return {
        type: "GET_ADD_USER_SUCCESS",
        data: data
    };
};

const getAddUserFail = (err) => {
    return {
        type: "GET_ADD_USER_FAIL",
        error: err
    };
};

export const getAddUser = (data, ownProps) => {
    return (dispatch) => {
        dispatch(getAddUserRequest());
        axios({
            method: 'post', 
            url: 'http://localhost:3001/api/putData',
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                age: data.age,
                sex: data.sex,
                password: data.password
            }    
        })
            .then(response => {
                dispatch(getAddUserSuccess(response.data.data));
                ownProps.history.push('/');

            })
            .catch(err => {
                dispatch(getAddUserFail(err));
            })
    }
}

const getUserRequest = () => {
    return {
        type: "GET_USER_REQUEST"
    };
};

const getUserSuccess = (data) => {
    return {
        type: "GET_USER_SUCCESS",
        data: data
    };
};

const getUserFail = (err) => {
    return {
        type: "GET_USER_FAIL",
        error: err
    };
};

export const getUser = (id, callback) => {
    return (dispatch) => {
        dispatch(getUserRequest());
        axios({
            method: 'post', 
            url: 'http://localhost:3001/api/getUser',
            data: {
                id: id
            }    
        })
            .then(response => {
                dispatch(getUserSuccess(response.data.data));
                callback();
            })
            .catch(err => {
                dispatch(getUserFail(err));
            })
    }
}

const getEditUserRequest = () => {
    return {
        type: "GET_EDIT_USER_REQUEST"
    };
};

const getEditUserSuccess = (data) => {
    return {
        type: "GET_EDIT_USER_SUCCESS",
        data: data
    };
};

const getEditUserFail = (err) => {
    return {
        type: "GET_EDIT_USER_FAIL",
        error: err
    };
};

export const getEditUser = (data, ownProps) => {
    return (dispatch) => {
        dispatch(getEditUserRequest());
        axios({
            method: 'post', 
            url: 'http://localhost:3001/api/updateData',
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                age: data.age,
                sex: data.sex,
                id: data.id
            }    
        })
            .then(response => {
                dispatch(getEditUserSuccess(response.data.data));
                ownProps.history.push('/');
            })
            .catch(err => {
                dispatch(getEditUserFail(err));
            })
    }
}

const getSearchUserRequest = () => {
    return {
        type: "GET_SEARCH_USER_REQUEST"
    };
};

const getSearchUserSuccess = (data) => {
    return {
        type: "GET_SEARCH_USER_SUCCESS",
        data: data
    };
};

const getSearchUserFail = (err) => {
    return {
        type: "GET_SEARCH_USER_FAIL",
        error: err
    };
};

export const getSearchUser = (value, callback) => {
    return (dispatch) => {
        dispatch(getSearchUserRequest());
        axios({
            method: 'get', 
            url: 'http://localhost:3001/api/getData',
            params: {
                search: value
            }
        })
            .then(response => {
                console.log(response.data.data);
                dispatch(getSearchUserSuccess(response.data.data));
                callback();
            })
            .catch(err => {
                dispatch(getSearchUserFail(err));
            })
    }
}

const getUsersRequest = () => {
    return {
        type: "GET_USERS_REQUEST"
    };
};

const getUsersSuccess = (data) => {
    return {
        type: "GET_USERS_SUCCESS",
        data: data
    };
};

const getUsersFail = (err) => {
    return {
        type: "GET_USERS_FAIL",
        error: err
    };
};

export const getUsers = (callback) => {
    return (dispatch) => {
        dispatch(getUsersRequest());
        axios({
            method: 'get', 
            url: 'http://localhost:3001/api/getData',
        })
            .then(response => {
                dispatch(getUsersSuccess(response.data.data));
                callback();
            })
            .catch(err => {
                dispatch(getUsersFail(err));
            })
    }
}

const getDeleteUsersRequest = () => {
    return {
        type: "GET_DELETE_USERS_REQUEST"
    };
};

const getDeleteUsersSuccess = (data) => {
    return {
        type: "GET_DELETE_USERS_SUCCESS",
        data: data
    };
};

const getDeleteUsersFail = (err) => {
    return {
        type: "GET_DELETE_USERS_FAIL",
        error: err
    };
};

export const getDeleteUsers = (id, callback) => {
    return (dispatch) => {
        dispatch(getDeleteUsersRequest());
        axios({
            method: 'delete', 
            url: 'http://localhost:3001/api/deleteData',
            data: {
                id : id
            }
        })
            .then(response => {
                dispatch(getDeleteUsersSuccess(response.data.data));
                callback();
            })
            .catch(err => {
                dispatch(getDeleteUsersFail(err));
            })
    }
}