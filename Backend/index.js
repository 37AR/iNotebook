const connectToMongo = require('./db');
const express = require('express')
const app = express();
const port = 5000
var cors = require('cors')

connectToMongo();
app.use(cors())


app.use(express.json());

// Available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.get('/', (req, res) => {
  res.send('Riya ekkada?')
})

app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})
