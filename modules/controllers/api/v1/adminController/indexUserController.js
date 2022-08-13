
const config = require('../../../../config')
const Controller = require(`${config.path.controller}/controller`)

const { response } = require(`${config.path.helper}/response`)
const { index } = require(`${config.path.helper}/indexAggregate`)
const { transform } = require(`${config.path.helper}/transform`)

const itemTransform = [
    '._id',
    '.firstName',
    '.lastName',
    '.email',
    '.mobile',
    '.type',
]


module.exports = new (class indexUserController extends Controller {

    async index(req, res) {
        let query = {}
        if (req.query.type) {
            try {
                let type = JSON.parse(req.query.type)
                query = { ...query, type: { $in: type } }
            } catch (err) {
                return this.abort(res, 404, null, 'تایپ وارد شده صحیح نیست',null, 'type')
            }
        }
        const result = await index(req, "user", query, [{ $sort: { _id: -1 } }])
        if (!result) return this.abort(res, 500, null)
        const Transform = await transform(result, itemTransform, true)
        return response(res, null, null, 200, Transform)

    }

})()
