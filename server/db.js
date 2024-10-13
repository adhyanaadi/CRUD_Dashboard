const mongoose = require('mongoose');
// const { default: CustomerHealthComponent } = require('../src/pages/CustomerHealth');

mongoose.connect('mongodb+srv://aadiadhyan:Adhyan@revfin.vyqwe.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const customerSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    phone: String,
    email: String,
    dob: String,
    dailyStepGoal: Number,
    avgSteps: Number,
    avgSleep: Number,
    avgCalories: Number,
    customerID: String
})

const customerHealthSchema = new mongoose.Schema({
    customerID: String,
    date: Date,
    healthData: [{
        'step':Number,
        'sleep':Number,
        'calories':Number
    }]
})

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
