import axios from 'axios'
import {limit} from "../constant"

const URL = `http://localhost:3001`

export const get = () => axios.get(`${URL}/get`)
export const add = (data) => axios.post(`${URL}/add`, data)
export const deleteWork = (data) =>  axios.delete(`${URL}/delete/${data.id}`)
export const updateWork = (data) => axios.put(`${URL}/update/${data.id}`, data)
export const statusWork = (data) => axios.put(`${URL}/status/${data.id}`, data)
export const pagination = (data) => axios.get(`${URL}/get`, {params: {activePage: data, limit}})
export const search = (data) => axios.get(`${URL}/search`, {params: {activePage: data.activePage, textSearch: data.textSearch, limit}})