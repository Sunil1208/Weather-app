const express = require("express")
const hbs = require("hbs")
const path = require("path")
const app = express()

const weatherData = require('../utils/weatherData')

var port = process.env.PORT || 3000


//Define which folder contains static files such as html,styles etc.
const publicStaticDirPath = path.join(__dirname, "../public")

//this will contain  the path to the views
const viewsPath = path.join(__dirname, '../templates/views')

//this will contain the path to the partials
const partialsPath = path.join(__dirname, '../templates/partials')

const errorPath = path.join(__dirname,'../Error')

//now let us tell the express server that following are the locations where views and partials directory exist
app.set('view engine', "hbs") //telling express server that all templates and html files are in the hbs format
app.set('views', viewsPath)

hbs.registerPartials(partialsPath)

//now our express app knows that public folder contains all the stylesheets,js and templating files
app.use(express.static(publicStaticDirPath))
app.use(express.static(errorPath))


app.get('/', (req, res) => {
    res.render('index',{
        title: "Weather App"
    })
})

//localhost:3000/weather?address=jalandhar
app.get('/weather', (req, res) => {
    //res.send("This is weather endpoint")
    const address = req.query.address
    if(!address){
        return res.send({
            error : "You must enter address in the search bar"
        })
    }   

    weatherData(address,(error,{temperature,description,cityName} = {})=>{
        //console.log(result)
        if(error){
            return res.send({
                error
            })
        }
        console.log({temperature,description,cityName})
        res.send({
            temperature,
            description,
            cityName
        })
    })
})


//this api will be for all invalid/wrong api call
// app.get("*", (req, res) => {
//     res.render('',{
//         title: "page not found"
//     })
// })

app.get("*", (req, res) => {
   res.sendFile(path.join(__dirname,'../Error/errorHTML.html'))
})

app.listen(port, () => {
    console.log('Server started at port ' + port)
})