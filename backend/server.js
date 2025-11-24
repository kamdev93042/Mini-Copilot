const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const apiRoutes = require('./routes/api');

//Use Routes
app.use('/api', apiRoutes);

//basic route to start server
app.get('/', (req, res) => {
    res.json({message: 'Server is running'});
})

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

