document.addEventListener('DOMContentLoaded', () => {
  VinylCollection.init();
});

// using immediately invoked function expression
// mitigates risks to using objects and functions normally globally scoped
const VinylCollection = (() => {
  // array to house json
  let vinylData = [];

  const init = () => {
    fetchVinylCollection();
    setupSortingDropdown();
  };

  // retrieve vinyl collection data from json
  const fetchVinylCollection = async () => {
    try {
      const response = await fetch('assets/data/albums.json');
      vinylData = await response.json();
      renderVinylCollection(vinylData);
    } catch (error) {
      console.error("Error loading collection:", error);
    }
  };

  // render loaded vinyl collection on page
  const renderVinylCollection = (data) => {
    const vinylContainer = document.getElementById('vinyl-collection');
    vinylContainer.innerHTML = '';

    // go through each entry in json object
    data.forEach(item => {
      const vinylCard = document.createElement('div');
      vinylCard.classList.add('col');

      // html card template
      vinylCard.innerHTML = `
      <div class="card h-100 bg-transparent text-light rounded-0 border-0">
        <img src="assets/images/${item.coverArt}" class="card-img-top rounded-0" alt="${item.title}">
        <div class="card-body px-0">
          <h3 class="card-title h5 release-title">${item.title}</h5>
          <p class="card-text release-artist">${item.artist}</p>
          <p class="card-text release-year fw-light border d-inline px-2">${item.releaseYear}</p>
        </div>
      </div>
      `;

      vinylContainer.appendChild(vinylCard);
    });
  };

  // retrieve value from dropdown
  const setupSortingDropdown = () => {
    const sortDropdown = document.getElementById('sort-dropdown');
    if (sortDropdown) {
      sortDropdown.addEventListener('change', () => {
        const sortBy = sortDropdown.value;
        sortRecords(sortBy);
      });
    }
  };

  // sorting algorithm
  const sortRecords = (sortBy) => {
    const vinylContainer = document.getElementById('vinyl-collection');
    const vinylItems = Array.from(vinylContainer.querySelectorAll('.col'));

    vinylItems.sort((a, b) => {
      let aText, bText;

      // compare string pairs in array to sort (title is default)
      if (sortBy === 'artist') {
        aText = a.querySelector('.release-artist').textContent;
        bText = b.querySelector('.release-artist').textContent;
      } else if (sortBy === 'year') {
        aText = a.querySelector('.release-year').textContent;
        bText = b.querySelector('.release-year').textContent;
      } else {
        aText = a.querySelector('.release-title').textContent;
        bText = b.querySelector('.release-title').textContent;
      }
      // localeCompare checks two strings at a time
      return aText.localeCompare(bText);
    });

    vinylContainer.innerHTML = '';
    vinylItems.forEach(item => vinylContainer.appendChild(item));
  };

  return {
    init,
  };
})();
