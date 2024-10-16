const mongoose = require('mongoose');
// const { default: CustomerHealthComponent } = require('../src/pages/CustomerHealth');
const { v4: uuidv4 } = require('uuid');

mongoose.connect('mongodb+srv://aadiadhyan:Adhyan@revfin.vyqwe.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const customerSchema = new mongoose.Schema({
    _id: {
      type: String,
      default: uuidv4,  // Automatically generate UUID as the _id
    },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    phone: { type: String, trim: true },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          // Basic email regex pattern for validation
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: props => `${props.value} is not a valid email!`,
      },
    },
    dob: Date,
    dailyStepGoal: Number,
    avgSteps: Number,
    avgSleep: Number,
    avgCalories: Number,
  });
  
const customerHealthSchema = new mongoose.Schema({
    customerEmail: {
      type: String,
      ref: 'Customer',
      required: true, //No need for validation as it is automatically done in the customer Schema.
    },
    date: Date,
    healthData: [{
        'step':Number,
        'sleep':Number,
        'calories':Number
    }]
})
// Pre-save middlewares to update average steps, sleep, and calories
// customerHealthSchema.pre('save', async function (next) {
//   try {
//     const healthRecords = await CustomerHealth.find({ customerEmail: this.customerEmail });

//     let totalSteps = 0, totalSleep = 0, totalCalories = 0, totalRecords = 0;

//     // Accumulate totals from existing health records
//     healthRecords.forEach((record) => {
//       record.healthData.forEach((data) => {
//         totalSteps += data.step || 0;
//         totalSleep += data.sleep || 0;
//         totalCalories += data.calories || 0;
//         totalRecords++;
//       });
//     });

//     // Include the new record's health data in the totals
//     this.healthData.forEach((data) => {
//       totalSteps += data.step || 0;
//       totalSleep += data.sleep || 0;
//       totalCalories += data.calories || 0;
//       totalRecords++;
//     });

//     // Calculate averages
//     const avgSteps = totalRecords > 0 ? totalSteps / totalRecords : 0;
//     const avgSleep = totalRecords > 0 ? totalSleep / totalRecords : 0;
//     const avgCalories = totalRecords > 0 ? totalCalories / totalRecords : 0;

//     // Update the Customer schema with the calculated averages
//     await Customer.findOneAndUpdate(
//       { email: this.customerEmail },
//       { avgSteps, avgSleep, avgCalories }
//     );

//     next(); // Proceed with saving the document
//   } catch (err) {
//     next(err); // Pass any errors to the next middleware
//   }
// });

// customerHealthSchema.pre('findOneAndUpdate', async function (next) {
//   try {
//     const updateData = this.getUpdate();
//     const customerEmail = updateData.customerEmail || this._conditions.customerEmail;

//     // Find all health records for this customer, including the current document's data
//     const healthRecords = await CustomerHealth.find({ customerEmail });

//     let totalSteps = 0, totalSleep = 0, totalCalories = 0, totalRecords = 0;

//     // Accumulate totals from existing health records
//     healthRecords.forEach((record) => {
//       record.healthData.forEach((data) => {
//         totalSteps += data.step || 0;
//         totalSleep += data.sleep || 0;
//         totalCalories += data.calories || 0;
//         totalRecords++;
//       });
//     });

//     // Also include the new record's health data in the totals if present
//     if (updateData.healthData) {
//       updateData.healthData.forEach((data) => {
//         totalSteps += data.step || 0;
//         totalSleep += data.sleep || 0;
//         totalCalories += data.calories || 0;
//         totalRecords++;
//       });
//     }

//     // Calculate averages
//     const avgSteps = totalRecords > 0 ? totalSteps / totalRecords : 0;
//     const avgSleep = totalRecords > 0 ? totalSleep / totalRecords : 0;
//     const avgCalories = totalRecords > 0 ? totalCalories / totalRecords : 0;

//     // Update the Customer schema with the recalculated averages
//     await Customer.findOneAndUpdate(
//       { email: customerEmail },
//       { avgSteps, avgSleep, avgCalories }
//     );

//     next(); // Proceed with the update
//   } catch (err) {
//     next(err); // Pass any errors to the next middleware
//   }
// });

// customerHealthSchema.pre('remove', async function (next) {
//   try {
//     const customerEmail = this.customerEmail; // Capture the email before deletion

//     // Find all health records for this customer except the one being deleted
//     const healthRecords = await CustomerHealth.find({ customerEmail });

//     let totalSteps = 0, totalSleep = 0, totalCalories = 0, totalRecords = 0;

//     // Accumulate totals from the remaining health records
//     healthRecords.forEach((record) => {
//       record.healthData.forEach((data) => {
//         totalSteps += data.step || 0;
//         totalSleep += data.sleep || 0;
//         totalCalories += data.calories || 0;
//         totalRecords++;
//       });
//     });

//     // Calculate averages
//     const avgSteps = totalRecords > 0 ? totalSteps / totalRecords : 0;
//     const avgSleep = totalRecords > 0 ? totalSleep / totalRecords : 0;
//     const avgCalories = totalRecords > 0 ? totalCalories / totalRecords : 0;

//     // Update the Customer schema with the recalculated averages
//     await Customer.findOneAndUpdate(
//       { email: customerEmail },
//       { avgSteps, avgSleep, avgCalories }
//     );

//     next(); // Proceed with the removal
//   } catch (err) {
//     next(err); // Pass any errors to the next middleware
//   }
// });

const updateCustomerAverages = async (customerEmail) => {
  try {
    const healthData = await CustomerHealth.find({ customerEmail });
    
    if (healthData.length === 0) return;

    let totalSteps = 0, totalSleep = 0, totalCalories = 0, count = 0;

    healthData.forEach(healthRecord => {
      healthRecord.healthData.forEach(data => {
        totalSteps += data.step || 0;
        totalSleep += data.sleep || 0;
        totalCalories += data.calories || 0;
        count++;
      });
    });

    const avgSteps = count ? totalSteps / count : 0;
    const avgSleep = count ? totalSleep / count : 0;
    const avgCalories = count ? totalCalories / count : 0;

    await Customer.updateOne(
      { email: customerEmail },
      { avgSteps, avgSleep, avgCalories }
    );
  } catch (error) {
    console.error(`Error updating customer averages: ${error.message}`);
  }
};

// Post hooks for save, update, delete
customerHealthSchema.pre('save', async function () {
  await updateCustomerAverages(this.customerEmail);
});

customerHealthSchema.pre('findOneAndUpdate', async function (doc) {
  if (doc) {
    await updateCustomerAverages(doc.customerEmail);
  }
});

// customerHealthSchema.pre('deleteOne', async function () {
//     await updateCustomerAverages(this.customerEmail);
// });
customerHealthSchema.pre('deleteOne', { document: false, query: true }, async function (next) {
  try {
    // Access the query to find the customerEmail from the document being deleted
    const healthRecord = await this.model.findOne(this.getFilter());
    if (healthRecord) {
      await updateCustomerAverages(healthRecord.customerEmail);
    }
  } catch (error) {
    console.error(`Error in deleteOne hook: ${error.message}`);
  }
  next();
});


customerHealthSchema.post('save', async function () {
  await updateCustomerAverages(this.customerEmail);
});

customerHealthSchema.post('findOneAndUpdate', async function (doc) {
  if (doc) {
    await updateCustomerAverages(doc.customerEmail);
  }
});

customerHealthSchema.post('deleteOne', async function () {
    await updateCustomerAverages(this.customerEmail);
});



const Customer = mongoose.model('Customer', customerSchema);
const CustomerHealth = mongoose.model('CustomerHealth', customerHealthSchema);


module.exports ={
    Customer,
    CustomerHealth
}



// JSON DATA TO SEND
// {
//     "firstName":"Aditya",
//     "lastName":"Adhyan",
//     "phone":"8102091322",
//     "email":"aadiadhyan@gmail.com",
//     "dob":"22102002",
//     "dailyStepGoal":6000,
//     "avgSteps":4000,
//     "avgSleep":8,
//     "avgCalories":3000,
//     "customerID":"something"
// }
