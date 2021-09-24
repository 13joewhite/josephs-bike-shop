const express = require('express')
const app = express()
require("dotenv").config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const expressJwt = require('express-jwt')
const secret = process.env.SECRET || "basketball church guitar frog"

//middleware
app.use(express.json())
app.use(morgan('dev'))

//  Connect to DB
mongoose.connect(process.env.MONGODB_URI, 
  { useNewUrlParser: true,
  useUnifiedTopology: true 
  } );
// mongoose.connect(process.env.REACT_APP_MONGODB_URI);

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
const path = require("path")

if(process.env.NODE_ENV === 'production'){
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
}) 