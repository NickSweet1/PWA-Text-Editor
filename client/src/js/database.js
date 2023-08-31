import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('Jate database already exists.');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('Jate database created.');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
  const jateDb = await openDB('jate', 1);

  // Open a read-write transaction.
  const tx = jateDb.transaction('jate', 'readwrite');

  // Get the object store.
  const store = tx.objectStore('jate');

  // Add the content to the object store.
  const request = await store.put({ id: 1, value: content });

  // Complete the transaction.
  const result = await request;

  console.log('Content added to the database with ID:', result);
  } catch (error) {
    console.error(error);
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try{
  console.log('GET from the database');

  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('jate', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .get() method to get data in the database.
  const request = store.get(1);

  // Get confirmation of the request.
  const result = await request;

  console.log('result.value', result);
  
  return result.value;

  } catch (error) {
    console.error(error);
  }
}

initdb();
