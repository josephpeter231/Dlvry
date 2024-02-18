const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/user');
const cors = require('cors')
const Inventory = require('./models/Inventory');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors())
// MongoDB connection
mongoose.connect('mongodb+srv://josephpeterjece2021:AJ9Hg6xTtQBUCoGr@cluster1.xaacunv.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes for register
app.post('/api/register', async (req, res) => {
    try {
      const { name, email, password,role} = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(req.body);
      const user = new User({ name, email, password: hashedPassword,role });
      await user.save();
      res.status(201).send('User registered successfully');
    } catch (error) {
      res.status(500).send('Error registering user');
    }
  });

  // Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
    
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

//Delivery Teams user names
app.get('/deliveryteam', async (req, res) => {
  try {
    const deliveryTeamUsers = await User.find({ role: 'deliveryteam' });
    const deliveryTeamUserNames = deliveryTeamUsers.map(user => user.name);
    res.json(deliveryTeamUserNames);
    console.log(deliveryTeamUserNames);
  } catch (error) {
    console.error('Error fetching delivery team users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

  app.post('/inventory/add', async (req, res) => {
    try {
      const inventoryItem = new Inventory(req.body);
      await inventoryItem.save();
      res.status(201).send('Inventory item added successfully');
    } catch (error) {
      res.status(500).send('Error adding inventory item');
    }
  });
  
  // Route for fetching all inventory items
  app.get('/inventory/all', async (req, res) => {
    try {
      const inventoryItems = await Inventory.find();
      res.status(200).json(inventoryItems);
    } catch (error) {
      res.status(500).send('Error fetching inventory items');
    }
  });

// PUT route to update a specific inventory item by ID
app.put('/inventory/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { pickedby } = req.body;
    
    const inventoryItem = await Inventory.findById(id);

    if (!inventoryItem) {
      return res.status(404).json({ error: 'Inventory item not found' });
    }
    inventoryItem.pickedby = pickedby;
    await inventoryItem.save();

    res.status(200).json({ message: 'Inventory item updated successfully', inventoryItem });
  } catch (error) {
    console.error('Error updating inventory item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
  

app.put('/inventory/status/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status} = req.body;
    console.log(req.body);
    const inventoryItem = await Inventory.findById(id);

    if (!inventoryItem) {
      return res.status(404).json({ error: 'Inventory item not found' });
    }
    inventoryItem.status = status;
    await inventoryItem.save();

    res.status(200).json({ message: 'Inventory item updated successfully', inventoryItem });
  } catch (error) {
    console.error('Error updating inventory item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
  
  
// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
