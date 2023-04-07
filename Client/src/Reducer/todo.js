import { getType, get, add, deleteWork, updateWork, pagination, status, search } from "../Actions";
import * as constants from '../constant'

export default function todoReducer (state = constants.DEFAUL_STATE.status, action){
    switch(action.type){
        case getType(get.getRequest):
            return{
                ...state,
                isLoading: true
            }
        case getType(get.getSuccess):
            return{
                ...state,
                isLoading: false,
                act: action.payload
            }
        case getType(get.getFail):
            return{
                ...state,
                isLoading: false,
                error: true
            }
        case getType(add.addRequest):
            return{
                ...state,
                isLoading: true
            }
        case getType(add.addSuccess):
            return {
                ...state,
                isLoading: false
            }
        case getType(add.addFail):
            return{
                ...state,
                isLoading: false,
                error: true
            }
        case getType(deleteWork.deleteRequest):
            return{
                ...state,
                isLoading: true
            }
        case getType(deleteWork.deleteSuccess):
            return{
                ...state,
                isLoading: false
            }
        case getType(deleteWork.deleteFail):
            return{
                ...state,
                isLoading: false,
                error: true
            }
        case getType(updateWork.updateRequest):
            return{
                ...state,
                isLoading: true
            }
        case getType(updateWork.updateSuccess):
            return {
                ...state,
                isLoading: false
            }
        case getType(updateWork.updateFail):
            return {
                ...state,
                isLoading: false,
                error: true
            }
        case getType(pagination.paginationRequest):
            return{
                ...state,
                isLoading: true
            }
        case getType(pagination.paginationSuccess):
            return{
                ...state,
                isLoading: false,
                act: action.payload.res,
                totalPage: action.payload.totalPage,
                activePage: action.payload.activePage
            }
        case getType(status.statusRequest):
            return {
                ...state,
                isLoading: true,
            }
        case getType(status.statusSuccess):
            return{
                ...state,
                isLoading: false,
            }
        case getType(status.statusFail):
            return{
                ...state,
                isLoading: false,
                error: true
            }
        case getType(search.searchRequest):
            return{
                ...state,
                isLoading: true
            }
        case getType(search.searchSuccess):
            return{
                ...state,
                isLoading: false,
                act: action.payload.res,
                totalPage: action.payload.totalPage,
                activePage: action.payload.activePage,
                textSearch: action.payload.textSearch
            }
        case getType(search.searchFail):
            return{
                ...state,
                isLoading: false
            }
        default:
            return state;

    }
}