require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  favoriteFoods: {
    type: [String]
  }
});

const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  // Define new Person object called johnPortin
  let johnPortin = Person({name: "John Portin", age: 30, favoriteFoods: ["pizza", "tacos", "dandanmian"]});

  // Save johnPortin to the database and handle any error that happens appropriately. What does done() do here?
  johnPortin.save(function(err, data) {
    if (err) return console.error(err);
    done(null, johnPortin);
  })
};

const createManyPeople = (arrayOfPeople, done) => {
  arrayOfPeople.forEach((person) => {
    Person(person).save(function(err, data) {
      if (err) return console.error(err);
      done(null, this);
    });
  });
};

function findPeopleByName(personName, done) {
  Person.find({ name: personName }, (err, personFound) => {
    if (err)
      return console.error(err);
    done(null, personFound);
  });
}

function findOneByFood(food, done) {
  Person.findOne({favoriteFoods: food}, (err, personFound) => {
    if (err) console.error(err);
    done(null, personFound);
  });
}

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, personFound) => {
    if (err) console.error(err);
    done(null, personFound);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, personFound) => {
    if (err) return console.error(err);

    personFound.favoriteFoods.push(foodToAdd);

    personFound.save((err, updatedPerson) => {
      if (err) return console.error(err);
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedPerson) => {
    if (err) return console.error(err);
    done(null, updatedPerson);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedPerson) => {
    if (err) return console.error(err);
    done(null, removedPerson);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, result) => {
    if (err) return console.error(err);
    done(null, result);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec((err, data) => {
      if (err) return console.error(err);
      console.log(data);
      done(null, data);
    });
  // done(null /*, data*/);
};


/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
