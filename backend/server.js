const express = require('express');
const axios = require('axios');
const cors=require('cors')
const app = express();
const PORT = 5000;
app.use(
  cors({
    origin: "https://simple-weather-app-mu-two.vercel.app",
    methods: "POST,GET",
    credentials: true
  })
);

app.use(express.json());


app.get('/weather/:city', async (req, res) => {
  const cityName = req.params.city;
  try {
    const response = await axios.get(
      ``
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
