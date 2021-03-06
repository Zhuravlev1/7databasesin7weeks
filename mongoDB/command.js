// use book;
// show collections;

db.towns.insert({
  name: "New York",
  population: 22200000,
  last_census: ISODate("2009-07-31"),
  famous_for: ["statue of liberty", "food"],
  mayor: {
    name: "Michael Bloomberg",
    party: "I"
  }
});

db.towns.find().pretty();

function insertCity(name, population, last_census, famous_for, mayor_info) {
  db.towns.insert({
    name: name,
    population: population,
    last_census: ISODate(last_census),
    famous_for: famous_for,
    mayor: mayor_info
  });
}

insertCity("Punxsutawney", 6200, '2008-31-01', ["phil the groundhog"], {name: "Jim Wehrle"});
insertCity("Portland", 582000, '2020-01-01', ["beer", "food"], {name: "Sam Adams", party: "D"});

db.towns.find({"_id": ObjectId("")}).pretty();
db.towns.find({"_id": ObjectId("")}, {name: 1}).pretty();
db.towns.find({"_id": ObjectId("")}, {name: 0}).pretty();

db.towns.find(
    {name: /^P/, population: {$lt: 10000}},
    {name: 1, population: 1}
);

const population_range = {};
population_range['$lt'] = 1000000;
population_range['$gt'] = 10000;
db.towns.find(
    {name: /^P/, population: population_range},
    {name: 1}
);

db.towns.find({last_census: {$lte: ISODate('2008-31-01')}}, {_id: 0, name: 1});

db.towns.find({famous_for: 'food'}, {_id: 0, name: 1, famous_for: 1});
db.towns.find({famous_for: /of/}, {_id: 0, name: 1, famous_for: 1});
db.towns.find({famous_for: {$all: ['food', 'beer']}}, {_id: 0, name: 1, famous_for: 1});
db.towns.find({famous_for: {$nin: ['food', 'beer']}}, {_id: 0, name: 1, famous_for: 1});
db.towns.find({'mayor.party': 'I'}, {_id: 0, name: 1, mayor: 1});
db.towns.find({'mayor.party': {$exists: false}}, {_id: 0, name: 1, mayor: 1});

db.countries.insert({
  _id: "us",
  name: "United States",
  exports: {
    foods: [
      {name: "bacon", tasty: true},
      {name: "burgers"}
    ]
  }
});

db.countries.insert({
  _id: "ca",
  name: "Canada",
  exports: {
    foods: [
      {name: "bacon", tasty: false},
      {name: "syrup", tasty: true}
    ]
  }
});
db.countries.insert({
  _id: "mx",
  name: "Mexico",
  exports: {
    foods: [
      {name: "salsa", tasty: true, condiment: true}
    ]
  }
});

db.countries.count();
db.countries.find({'exports.foods.name': 'bacon', 'exports.foods.tasty': true}, {_id: 0, name: 1});

db.countries.find(
    {'exports.foods': {$elemMatch: {name: 'bacon', tasty: true}}},
    {_id: 0, name: 1}
);

db.countries.find(
    {'exports.foods': {$elemMatch: {tasty: true, condiment: {$exists: true}}}},
    {_id: 0, name: 1}
);

db.countries.find(
    {$or: [{_id: "mx"}, {name: "United States"}]},
    {_id: 1}
);

db.towns.update(
    {_id: ObjectId("")},
    {$set: {"state": "OR"}}
);

db.towns.findOne({_id: ObjectId("")});

db.towns.update(
    {_id: ObjectId("")},
    {$inc: {"population": 1000}}
);

db.towns.update(
    {_id: ObjectId("")},
    {$set: {country: {$ref: "countries", $id: "us"}}}
);

const portland = db.towns.findOne({_id: ObjectId("")});
db.countries.findOne({_id: portland.country.$id});
db[portland.country.$ref].findOne({_id: portland.country.$id});
db.towns.remove({_id: ObjectId("")});

const bad_bacon = {
  'exports.foods': {
    $elemMatch: {
      name: 'bacon',
      tasty: false
    }
  }
};

db.countries.find(bad_bacon);

db.countries.remove(bad_bacon);
db.countries.count();

db.towns.find(function () {
  return this.population > 6000 && this.population < 600000;
});
db.towns.find("this.population > 6000 && this.population < 600000");

db.towns.find({
  $where: "this.population > 6000 && this.population < 600000",
  famous_for: /groundhog/
});

db.articles.update(
    {_id: ObjectId("")},
    {
      $set: {
        comments: [
          {
            authorName: "author name",
            text: "first comment"
          }
        ]
      }
    });

populatePhones = function (area, start, stop) {
  for (let i = start; i < stop; i++) {
    const country = 1 + ((Math.random() * 8) << 0);
    const num = (country * 1e10) + (area * 1e7) + i;
    db.phones.insert({
      _id: num,
      components: {
        country: country,
        area: area,
        prefix: (i * 1e-4) << 0,
        number: i
      },
      display: "+" + country + " " + area + "-" + i
    });
  }
};
populatePhones(800, 5550000, 5650000);

db.phones.find().limit(2);
db.phones.getIndexes();

db.phones.find({display: "+2 800-5550001"}).explain({verbose: "executionStats"});

db.phones.ensureIndex({display: 1}, {unique: true, dropDups: true});
db.setProfilingLevel(2);
db.phones.find({display: "+2 800-5550001"});

db.system.profile.find().pretty();
db.phones.ensureIndex({"components.area": 1}, {background: 1});
db.phones.getIndexes();

db.phones.count({'components.number': {$gt: 5599999}});
populatePhones(855, 5550000, 5650000);

db.phones.distinct('components.number', {'components.number': {$lt: 5550005}});

db.phones.aggregate([
  {$match: {'components.number': {$gt: 5599999}}},
  {$group: {_id: "$components.area", total: {$sum: 1}}}
]);

update_area = function () {
  db.phones.find().forEach(
      function (phone) {
        phone.components.area++;
        phone.display = "+" +
            phone.components.country + " " +
            phone.components.area + "-" +
            phone.components.number;
        db.phone.update({_id: phone._id}, phone, false);
      }
  )
};

// eval is deprecated. Use transactions for mongo 4.2 and more
// https://docs.mongodb.com/manual/core/transactions/
db.eval(update_area);
db.runCommand({"count": "phones"});

db.system.js.save({
  _id: 'getLast',
  value: function (collection) {
    return collection.find({}).sort({'_id': 1}).limit(1)[0]
  }
});

db.eval('getLast(db.phones)');

distinctDigits = function (phone) {
  const number = phone.components.number + '',
      seen = [],
      result = [];
  let i = number.length;
  while (i--) {
    seen[+number[i]] = 1;
  }
  for (i = 0; i < 10; i++) {
    if (seen[i]) {
      result[result.length] = i;
    }
  }
  return result;
};
db.system.js.save({_id: 'distinctDigits', value: distinctDigits});
distinctDigits(db.phones.findOne({'components.number': 5551213}));

map = function () {
  const digits = distinctDigits(this);
  emit({digits: digits, country: this.components.country}, {count: 1});
};

reduce = function (key, values) {
  let total = 0;
  for (let i = 0; i < values.length; i++) {
    total += values[i].count;
  }
  return {count: total};
};

results = db.runCommand({
  mapReduce: 'phones',
  map: map,
  reduce: reduce,
  out: 'phones.report'
});
db.phones.report.find({'_id.country' : 8});