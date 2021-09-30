const path = require("path")
const express = require('express')
const connectDB = require("./config/db")
const morgan = require('morgan')
const expressJwt = require('express-jwt')
const secret = process.env.SECRET || "basketball church guitar frog"
const app = express()

//  Connect to DB
connectDB()

//middleware
app.use(express.json({extended: false}))
app.use(morgan('dev'))

app.use('/auth', require('./routes/authRouter'))
app.use("/api", expressJwt({ secret: secret, algorithms: ['sha1', 'RS256', 'HS256'] }))
app.use("/api/bikes", require("./routes/bikesRoute"))

// error handling last piece of middleware before app.listen
app.use((err,res) => {
    console.log("error")
    if(err.name === "UnauthorizedError") {
      res.status(err.status)
      }
    return res.send({errMsg: err.message})
  }) 

  // ... other imports 

if(process.env.NODE_ENV === 'production'){
  // Set static folder
  app.use('/static', express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
}) 