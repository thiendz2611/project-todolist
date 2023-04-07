import {takeLatest, put, call, select} from 'redux-saga/effects'
import * as API from '../API'
import * as actions from '../Actions'

function * getSaga(){
    try {
        const res = yield call(API.get)
        console.log(res, 'res saga');
        yield put(actions.get.getSuccess(res.data.listData))
    } catch (error) {
        yield put(actions.get.getFail(error))
    }
}

function * addSaga(data){
    
    try {
        yield call(API.add, data.payload)
        yield put(actions.add.addSuccess())
        const res = yield call(API.pagination, 1)
        yield put(actions.pagination.paginationRequest(res.data.totalPage))
    } catch (error) {
        yield put(actions.add.addFail())
    }
}

function * deleteSaga(data){
    const reducerData = yield select(state => state.todoReducer)
    try {
        yield call(API.deleteWork, data.payload)
        yield put(actions.deleteWork.deleteSuccess())
        if(!reducerData.textSearch){
            const res = yield call(API.pagination, 1)
            if(reducerData.activePage > res.data.totalPage){
                yield put(actions.pagination.paginationRequest(res.data.totalPage))
            }else{
                yield put(actions.pagination.paginationRequest(reducerData.activePage))
            }
        }else{
            const res = yield call(API.search, {activePage: 1, textSearch: reducerData.textSearch})
            if(reducerData.activePage > res.data.totalPage){
                yield put(actions.search.searchRequest({activePage: res.data.totalPage, textSearch: res.data.textSearch}))
            }else{
                yield put(actions.search.searchRequest({activePage: reducerData.activePage, textSearch: reducerData.textSearch}))
            }
        }
        
    } catch (error) {
        yield put(actions.deleteWork.deleteFail())
    }
}

function * updateSaga(data){
    const reducerData = yield select(state => state.todoReducer)
    try {
        yield call(API.updateWork, data.payload)
        yield put(actions.updateWork.updateSuccess())
        yield put(actions.pagination.paginationRequest(reducerData.activePage))
    } catch (error) {
        yield put(actions.updateWork.updateFail())
    }
}

function * statusSaga(data){
    const reducerData = yield select(state => state.todoReducer)
    try {
        yield call(API.statusWork, data.payload)
        yield put(actions.status.statusSuccess())
        yield put(actions.pagination.paginationRequest(reducerData.activePage))
    } catch (error) {
        yield put(actions.status.statusFail())
    }
}

function * paginationSaga(data){
    try {
        const res = yield call(API.pagination, data.payload)
        yield put(actions.pagination.paginationSuccess({res: res.data.listData, totalPage: res.data.totalPage, activePage: res.data.activePage}))
    } catch (error) {
        yield put(actions.pagination.paginationFail())
    }
}

function * searchSaga(data){
    try {
        const res = yield call(API.search, data.payload)
        yield put(actions.search.searchSuccess({res: res.data.listData, totalPage: res.data.totalPage, activePage: res.data.activePage, textSearch: res.data.textSearch}))
    } catch (error) {
        yield put(actions.search.searchFail())
    }
}

function * rootSaga(){
    yield takeLatest(actions.get.getRequest, getSaga)
    yield takeLatest(actions.add.addRequest, addSaga)
    yield takeLatest(actions.deleteWork.deleteRequest, deleteSaga)
    yield takeLatest(actions.updateWork.updateRequest, updateSaga)
    yield takeLatest(actions.pagination.paginationRequest, paginationSaga)
    yield takeLatest(actions.status.statusRequest, statusSaga)
    yield takeLatest(actions.search.searchRequest, searchSaga)
}

export default rootSaga