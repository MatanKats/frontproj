
let idb = {
  openCaloriesDB: (dbName, version) => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName, version);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        const store = db.createObjectStore('calories', { keyPath: 'id', autoIncrement: true });
        store.createIndex('monthYear', 'monthYear');
      };

      request.onsuccess = (event) => {
        resolve(event.target.result);
      };

      request.onerror = (event) => {
        reject('Error opening database:', event.target.error);
      };
    });
  },


  addCalories: (entry) => {
    return new Promise(async (resolve, reject) => {
      const db = await idb.openCaloriesDB('caloriesdb', 1);
      const transaction = db.transaction('calories', 'readwrite');
      const store = transaction.objectStore('calories');
      entry.date = new Date();
      entry.monthYear = entry.date.toISOString().slice(0, 7); // YYYY-MM

      const request = store.add(entry);
      request.onsuccess = () => {
        resolve(true);
      };
      request.onerror = () => {
        reject('Error adding entry');
      };
    });
  },

  getReport: (monthYear) => {
    return new Promise(async (resolve, reject) => {
      const db = await idb.openCaloriesDB('caloriesdb', 1);
      const transaction = db.transaction('calories', 'readonly');
      const store = transaction.objectStore('calories');
      const index = store.index('monthYear');

      const request = index.getAll(IDBKeyRange.only(monthYear));
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = () => {
        reject('Error retrieving report');
      };
    });
  }
};
