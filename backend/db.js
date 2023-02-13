const mongoose = require('mongoose')

const mongoDB = () => {
    mongoose.connect('mongodb://localhost:27017/react', { useNewUrlParser: true }, () => {
        console.log("connected");

        const fetched_data = mongoose.connection.db.collection("food_items")
        fetched_data.find({}).toArray(function (err, data) {

            const foodCategory = mongoose.connection.db.collection("foodCategory")
            foodCategory.find({}).toArray(function (err, catData) {
                if (err) console.log(err);
                else {
                    global.food_items = data
                    global.foodCategory = catData

                }

            })
            // if (err) console.log(err);
            // else {
            //     global.food_items=data

            // }
        })

    });
}
module.exports = mongoDB

