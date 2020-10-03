const express = require('express')
const path = require('path')
const hbs = require('hbs')
const httpReq = require('./utils/request.js')



const app = express()
const port = process.env.PORT || 3000


//PATH FOR PUBLIC DIR   
const publicDir = path.join(__dirname, '../public')
app.use(express.static(publicDir))
//path for templates
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Dictionary'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page'
    })
})
//main route
app.get('/dict', (req, res) => {
    if (!req.query.word) {
        return res.send({
            error: 'You must provide a word'
        })
    }
    httpReq(req.query.word, (error, data) => {
        if (error) {
            return res.send({
                error: error
            })
        } else {

            return res.send(data)
        }

    })
})

/*404 page*/

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 page',
        errorMssg: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
})