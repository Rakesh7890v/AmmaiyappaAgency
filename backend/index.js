const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const FoodModel = require('./models/Foods');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5000;
app.use(cors({
    origin: ['https://ammaiyappaagency.vercel.app','http://localhost:5173'],
    methods: 'GET,POST,PUT',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect("mongodb+srv://rakeshrishi098:Rakesh.v109@sabari.fcdhg.mongodb.net/")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Connection error", err));

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

app.get('/', (req,res) => {
    res.json("Hello");
})

app.get('/foods', (req, res) => {
    FoodModel.find({})
        .then(foods => res.json(foods))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while fetching foods' });
        });
});

app.post('/addfoods', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const foodData = {
        name: req.body.name,
        price: req.body.price,
        qnt: req.body.qnt,
        image: `uploads/${req.file.filename}`,
        type: req.body.type,
    };

    FoodModel.create(foodData)
        .then(food => res.status(200).json(food))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while adding the food' });
        });
});

app.post('/update', upload.single('image'), async (req, res) => {
  const { id, name, price, qnt, type } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const updateData = { name, price, qnt, type };
    if (image) updateData.image = image;

    const updatedFood = await FoodModel.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedFood) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    res.status(200).json({ message: 'Food item updated successfully', data: updatedFood });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
});


app.post('/delete', (req, res) => {
    const {id} = req.body;
    FoodModel.findByIdAndDelete(id)
    .then(() => res.send("Sucess"))
    .catch(err => console.log(err));
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});