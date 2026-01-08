const form = document.getElementById('profileForm');
const savedText = document.getElementById('savedText');
const clearSavedBtn = document.getElementById('clearSavedBtn');
const photoInput = document.getElementById('photoInput');
const photoPlaceholder = document.getElementById('photoPlaceholder');
const profileImage = document.getElementById('profileImage');
const removePhotoBtn = document.getElementById('removePhotoBtn');

const profile = {
  age: null,
  feet: null,
  inches: null,
  weight: null,
  photo: null
};

function updateDisplay() {
  if (profile.age || profile.feet || profile.inches || profile.weight) {
    const parts = [];
    if (profile.age) parts.push(`Age: ${profile.age}`);
    if (profile.feet || profile.inches) {
      const ft = profile.feet || 0;
      const inch = profile.inches || 0;
      parts.push(`Height: ${ft}'${inch}"`);
    }
    if (profile.weight) parts.push(`Weight: ${profile.weight} lbs`);
    savedText.textContent = parts.join(' • ');
  } else {
    savedText.textContent = 'No profile saved yet.';
  }
}

photoInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      profile.photo = event.target.result;
      profileImage.src = profile.photo;
      profileImage.style.display = 'block';
      photoPlaceholder.style.display = 'none';
      removePhotoBtn.style.display = 'inline-flex';
    };
    reader.readAsDataURL(file);
  }
});

removePhotoBtn.addEventListener('click', () => {
  profile.photo = null;
  profileImage.style.display = 'none';
  photoPlaceholder.style.display = 'flex';
  removePhotoBtn.style.display = 'none';
  photoInput.value = '';
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  profile.age = document.getElementById('age').value || null;
  profile.feet = document.getElementById('feet').value || null;
  profile.inches = document.getElementById('inches').value || null;
  profile.weight = document.getElementById('weight').value || null;
  updateDisplay();
});

clearSavedBtn.addEventListener('click', () => {
  profile.age = null;
  profile.feet = null;
  profile.inches = null;
  profile.weight = null;
  profile.photo = null;
  profileImage.style.display = 'none';
  photoPlaceholder.style.display = 'flex';
  removePhotoBtn.style.display = 'none';
  photoInput.value = '';
  updateDisplay();
});

// Weekly progress photos functionality
const progressPhotos = {};
const weekSelect = document.getElementById('weekSelect');
const progressPhotoInput = document.getElementById('progressPhotoInput');
const photoGallery = document.getElementById('photoGallery');

function displayProgressPhotos() {
  photoGallery.innerHTML = '';
  
  const allWeeks = Object.keys(progressPhotos).sort((a, b) => parseInt(a) - parseInt(b));
  
  if (allWeeks.length === 0) {
    photoGallery.innerHTML = '<div class="empty-gallery">No photos uploaded yet. Select a week and upload your progress photos!</div>';
    return;
  }

  allWeeks.forEach(week => {
    const photos = progressPhotos[week];
    photos.forEach((photoData, index) => {
      const photoItem = document.createElement('div');
      photoItem.className = 'photo-item';
      photoItem.innerHTML = `
        <img src="${photoData}" alt="Week ${week} progress photo" />
        <div class="photo-label">Week ${week}</div>
        <button class="delete-photo" data-week="${week}" data-index="${index}">×</button>
      `;
      photoGallery.appendChild(photoItem);
    });
  });

  document.querySelectorAll('.delete-photo').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const week = e.target.dataset.week;
      const index = parseInt(e.target.dataset.index);
      progressPhotos[week].splice(index, 1);
      if (progressPhotos[week].length === 0) {
        delete progressPhotos[week];
      }
      displayProgressPhotos();
    });
  });
}

progressPhotoInput.addEventListener('change', (e) => {
  const selectedWeek = weekSelect.value;
  
  if (!selectedWeek) {
    alert('Please select a week first!');
    progressPhotoInput.value = '';
    return;
  }

  const files = Array.from(e.target.files);
  
  if (files.length === 0) return;

  if (!progressPhotos[selectedWeek]) {
    progressPhotos[selectedWeek] = [];
  }

  let filesProcessed = 0;

  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = (event) => {
      progressPhotos[selectedWeek].push(event.target.result);
      filesProcessed++;
      
      if (filesProcessed === files.length) {
        displayProgressPhotos();
        progressPhotoInput.value = '';
      }
    };
    reader.readAsDataURL(file);
  });
});

displayProgressPhotos();
```

---
