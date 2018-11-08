const express = require('express');
const app = express();

app.use(express.static('build'));

const port = process.env.PORT || 8080;
app.get("/*", (req , res) => {
  res.sendFile(__dirname + "/build/index.html")
})

app.listen(port,() => console.log('App is running'));