// import LocalStorageMock from './LocalStorageMock';

// if (typeof window.localStorage == 'undefined') {
//   const localStorage = new LocalStorageMock();
// }

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
  console.log(localStorage);
  localStorage.setItem('requests', JSON.stringify(requests));
}

export function filterList(name, lists) {
  const listID = Object.keys(lists).filter((key) => {
    return lists[key].name === name;
  });
  return listID;
}