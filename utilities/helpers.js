// Check that token starts with 'Bearer' and append if it doesn't
module.exports.sanitiseToken = function (token) {
  return (token.startsWith('Bearer ')) ? token : 'Bearer ' + token;
}

// Check that params object has keys to match the correct paramList, return an array of missing params
module.exports.checkMissingParameters = function (params, paramList) {
  const paramKeys = Object.keys(params);
  let missingParams = [];

  for (let i = 0; i < paramList.length; i++) {
    if (paramKeys[i] !== paramList[i]) missingParams.push(paramList[i])
  }

  return missingParams;
}

// Takes an array of items and returns up to the desired number of randomly selected items from it
module.exports.getRandomSelection = function (collection, numberOfItems) {
  const num = (numberOfItems > collection.length) ? collection.length : numberOfItems; // Ensure that we aren't being asked for more items than are in the collection
  let randomItemIndices = [];
  let randomItems = [];

  while (randomItemIndices.length < num) { // Build an array of indices to return
    let randomNum = getRandomInteger(collection.length - 1); // Get a random number for the index of an item in the collection
    if (!randomItemIndices.includes(randomNum)) randomItemIndices.push(randomNum); // If we don't already have that index in our array, add it
  }

  randomItemIndices.forEach(item => {
    randomItems.push(collection[item]); // Push our randomly selected items into a new array
  });

  return randomItems;
}

// Returns a random integer between 0 and maximum
function getRandomInteger(maximum) {
  return Math.floor(Math.random() * Math.floor(maximum));
}
