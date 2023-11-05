const mongoose = require("mongoose");

const ingredientSchema = mongoose.Schema({
    name: String,
    img: String,
    vol: String,
});

const nutritionSchema = mongoose.Schema({
    name: String,
    value: String,
});
const instructionsSchema = mongoose.Schema({
    info: String,
    img: String,
});

const menuSchema = mongoose.Schema({
    img: String,
    name: String,
    addition: String,
    desc: String,
    tags: [String],
    allergens: [String],
    time: String,
    prep_time: String,
    difficulty: String,
    ingredients: [ingredientSchema],
    nutrition: [nutritionSchema],
    instructions: [instructionsSchema],
    utensils: [String],
}, {
    versionKey: false
});

const MenuModel = mongoose.model("menu", menuSchema);

module.exports = {
    MenuModel
};
