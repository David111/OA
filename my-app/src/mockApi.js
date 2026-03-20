import records from '../src/Data.json';

function mockApiCall(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(records); // Resolve the promise with the mock data
    }, ms);
  });
}

// Use the mock function with async/await
export default async function getMockData() {
  const data = await mockApiCall(2000); // Wait for 2 seconds
  return data;
}