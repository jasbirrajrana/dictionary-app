const request = require('request')

const httpReq = (word, callback) => {
    const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + encodeURIComponent(word).toLowerCase()
    request({
        url: url,
        json: true
    }, (error, res) => {
        if (!Array.isArray(res.body)) {
            callback(res.body);
        } else {

            callback(undefined, res)
        }
    })
}


module.exports = httpReq