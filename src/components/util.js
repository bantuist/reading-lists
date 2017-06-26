// https://stackoverflow.com/questions/32911630/how-do-i-deal-with-localstorage-in-jest-tests
// class LocalStorageMock {
//   constructor() {
//     this.store = {};
//   }

//   clear() {
//     this.store = {};
//   }

//   getItem(key) {
//     return this.store[key];
//   }

//   setItem(key, value) {
//     this.store[key] = value;
//   }

//   removeItem(key) {
//     delete this.store[key];
//   }
// }

// console.log('Using LocalStorageMock');
// const localStorage = new LocalStorageMock();

export function getRequests() {
  let requests = JSON.parse(localStorage.getItem('requests'));
  // Track daily Google Books API calls
  if (!requests || requests.date !== new Date().toLocaleDateString()) {
    requests = {
      count: 0,
      date: new Date().toLocaleDateString()
    };
  } 
  return requests;
} 

export function setRequests(requests) {
  localStorage.setItem('requests', JSON.stringify(requests));
}

export function filterList(name, lists) {
  return Object.keys(lists).filter((key) => {
    return lists[key].name === name;
  });
}