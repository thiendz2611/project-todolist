const model = require('../model/index')

exports.add = async (req, res) => {
    try {
        const nameWork = req.body.nameWork
        const date = req.body.date
        const status = req.body.status
        const listData = await model.create({nameWork: nameWork, date: date, status: status})
        res.send({message: 'success', listData})
    } catch (error) {
        res.send(error)
    }
}

exports.get = async (req, res) => {
    try {
        const listData = await model.find()
        res.send({listData})
    } catch (error) {
        res.send(error)
    }
}

exports.delete = async (req, res) => {
    try {
        const id = req.params.id
        await model.findByIdAndDelete(id)
        res.send({message: 'success'})
    } catch (error) {
        res.send({message: 'fail'})
    }
}

exports.update = async (req, res) => {
    try {
        const id = req.params.id
        const nameWork = req.body.nameWork
        await model.findByIdAndUpdate(id, {nameWork: nameWork})
        res.send({message: 'success'})
    } catch(error){
        res.send(error)
    }
}

exports.statusWork = async(req, res)=> {
    try {
        const id = req.params.id
        const status = req.body.status
        await model.findByIdAndUpdate(id, {status: status})
        res.send({message: "success"})
    } catch (error) {
        res.send(error)
    }
}

exports.pagination = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit)
        const activePage = parseInt(req.query.activePage)
        const skip = (activePage - 1) * limit
        const totalItem = await model.countDocuments()
        const totalPage = Math.ceil(totalItem / limit)
        const listData = await model.find().skip(skip).limit(limit)
        res.send({listData, totalPage, activePage})
    } catch (error) {
        res.send(error)
    }
}

exports.search = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit)
        const activePage = parseInt(req.query.activePage)
        const textSearch = req.query.textSearch
        const skip = (activePage - 1) * limit
        const totalItem = await model.countDocuments({status: textSearch})
        const totalPage = Math.ceil(totalItem / limit)
        const listData = await model.find({status: textSearch}).skip(skip).limit(limit)
        res.send({listData, totalPage, activePage, textSearch})
    } catch (error) {
        res.send(error)
    }
}