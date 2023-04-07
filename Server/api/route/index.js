const controller = require('../controller/index')

const routes = (app) => {
    app.route('/add').post(controller.add)
    app.route('/get').get(controller.pagination)
    app.route('/delete/:id').delete(controller.delete)
    app.route('/update/:id').put(controller.update)
    app.route('/status/:id').put(controller.statusWork)
    app.route('/search').get(controller.search)
}

module.exports = routes