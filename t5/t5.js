import {createTable, getRestaurants, sortRestaurants} from './components.js';

const main = async () => {
  try {
    await getRestaurants();
    sortRestaurants();
    createTable();
  } catch (error) {
    console.error(error);
  }
};

main();
