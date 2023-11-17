// Importing the 'openDB' function from the 'idb' package, which is a wrapper around IndexedDB.
import { openDB } from 'idb';

// Defining an asynchronous function 'initdb' to initialize the database.
const initdb = async () =>
  // Opening or creating a database named 'jate' with version number 1.
  openDB('jate', 1, {
    // The 'upgrade' callback is executed when the database is first created or when a version change is detected.
    upgrade(db) {
      // Checking if an object store named 'jate' already exists in the database.
      if (db.objectStoreNames.contains('jate')) {
        // Logging to the console if the 'jate' database already exists.
        console.log('jate database already exists');
        // Exiting the function early if the database already exists.
        return;
      }
      // Creating a new object store named 'jate' with 'id' as the key path and enabling auto-increment.
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      // Logging to the console that a new 'jate' database has been created.
      console.log('jate database created');
    },
  });

// Defining an asynchronous function 'putDb' that takes 'id' and 'content' as parameters, to add data to the database.
export const putDb = async (id, content) => {
  // Opening the 'jate' database with version number 1.
  const jateDB = await openDB("jate", 1);
  // Starting a readwrite transaction on the 'jate' object store.
  const tx = jateDB.transaction("jate", "readwrite");
  // Accessing the 'jate' object store from the transaction.
  const store = tx.objectStore("jate");
  // Putting the data (with 'id' and 'content') into the object store.
  const request = store.put({id: id, jate: content });
  // Waiting for the request to complete and storing the result.
  const result = await request;
  // Logging to the console that data has been saved to the database.
  console.log("Data saved to the database", result);
  // Logging the content that was saved.
  console.log("**** database.js putDB content:" + content)
};

// Defining an asynchronous function 'getDb' to retrieve all content from the database.
export const getDb = async () => {
  // Opening the 'jate' database with version number 1.
  const jateDB = await openDB("jate", 1);
  // Starting a readonly transaction on the 'jate' object store.
  const tx = jateDB.transaction("jate", "readonly");
  // Accessing the 'jate' object store from the transaction.
  const store = tx.objectStore("jate");
  // Requesting all records from the store.
  const request = store.getAll();
  // Waiting for the request to complete and storing the result.
  const result = await request;
  // Logging the result to the console.
  console.log(result);
};

// Executing the 'initdb' function to initialize the database.
initdb();
