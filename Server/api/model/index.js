const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    nameWork: {type:String},
//     extendWork: {type:String},
    date: {type:String},
//     color: {type: String,
//             enum: ['red', 'yellow', 'color']
//     },
    status: {type: String,
        enum: ["Hoàn thành", "Chưa hoàn thành"]
    }
    
})

module.exports = mongoose.model('todo-db', Schema)