import {createActions} from 'redux-actions'

export const getType = (reduxActions) => {
    return reduxActions().type
}

export const get = createActions({
    getRequest: undefined,
    getSuccess: (payload) => payload,
    getFail: undefined
})

export const add = createActions({
    addRequest: (payload) => payload,
    addSuccess: undefined,
    addFail: undefined
})

export const deleteWork = createActions({
    deleteRequest: (payload) => payload,
    deleteSuccess: undefined,
    deleteFail: undefined
})

export const updateWork = createActions({
    updateRequest: (payload) => payload,
    updateSuccess: undefined,
    updateFail: undefined
})

export const pagination = createActions({
    paginationRequest: (payload) => payload,
    paginationSuccess: (payload) => payload,
    paginationFail: undefined
})

export const status = createActions({
    statusRequest: (payload) => payload,
    statusSuccess: undefined,
    statusFail: undefined
})

export const search = createActions({
    searchRequest: (payload) => payload,
    searchSuccess: (payload) => payload,
    searchFail: undefined
})