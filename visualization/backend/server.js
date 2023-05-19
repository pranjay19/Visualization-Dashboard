const express = require('express');
const app = express();
const port = 5000;
const { MongoClient } = require('mongodb');
const path = require('path');
const cors = require('cors'); // Import the cors package

// Enable CORS
app.use(cors());

app.use(express.static(path.join(__dirname, 'client/build')));

const uri = 'mongodb://localhost:27017'; // Replace with your MongoDB connection URI
const client = new MongoClient(uri);

app.get('/api/data', async(req, res) => {
    try {
        await client.connect();
        const database = client.db('internship'); // Replace with your MongoDB database name
        const collection = database.collection('data'); // Replace with your collection name
        const data = await collection.find().toArray();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    } finally {
        await client.close();
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});