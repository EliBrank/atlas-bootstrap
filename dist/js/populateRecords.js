let records = [];

async function loadRecordCollection() {
  try {
    const response = await fetch('../assets/data/albums.json')
    records = await response.json();
    populateRecords(records);
  } catch (error) {
    console.error('Error loading collection:', error);
  }
}

function populateRecords(records) {
  const recordContainer = document.getElementById('record-collection')
}
