const express = require('express');
require('./services/passport');

const app = express();

require('./routes/authRoutes')(app);

app.get('/random', (req, res) => {
    res.send({ tenet: "no friends at dusk" });
});


app.listen(5000);