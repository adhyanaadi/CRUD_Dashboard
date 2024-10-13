const express = require("express");
const { Customer } = require("./db");  // Assuming you have this defined in your db.js

// Use express.json() to parse JSON request bodies
const app = express();
app.use(express.json());  // Apply middleware for parsing JSON


// Define the POST route for /api/customer
app.post('/api/customer', async (req, res) => {
  try {
    const { firstName, lastName, phone, email, dob, dailyStepGoal } = req.body;

    // Create a new customer object
    const newCustomer = new Customer({
      firstName,
      lastName,
      phone,
      email,
      dob,
      dailyStepGoal: parseInt(dailyStepGoal),
      avgSteps: 0,  // Set default values
      avgSleep: 0,
      avgCalories: 0,
      customerID: `CUST-${Date.now()}`,  // Create unique customerID
    });

    // Save the new customer to the database
    await newCustomer.save();

    // Respond with success message
    res.status(201).json({ message: 'Customer created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create customer' });
  }
});

// Mount the router to the /api path
app.use((req, res) => {
    res.status(404).send('Route not found'); // Return 404 for invalid routes
  });

// Default root route for basic response
app.get('/', (req, res) => {
    console.log('Received a GET request at /');
    res.send('Server is running');
  });

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
