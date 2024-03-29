const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const loans = require('./routes/api/loans')

const app = express()

// Bodyparser Middleware
app.use(bodyParser.json())

// DB Config
const db = require('./config').mongoURI

// Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true , useUnifiedTopology: true, family: 4})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.log(err))

// Use Routes
app.use('/api/loans', loans)

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`))
