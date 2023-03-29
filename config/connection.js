const e = require('express')

const MongoClient = require('mongodb').MongoClient
const state = {
    db: null
}
module.exports.connect = (done) => {
   // const url = 'mongodb://localhost:27017'

    const dbname = 'shopping'
    MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true },(err, data) => {
        if (err)
            return done(err)

        else
            state.db = data.db(dbname)

        done()
    })


}

module.exports.get = function () {
    return state.db
}