const destinations = [
  {
    title: 'Maletsunyane Falls',
    location: 'Semonkong',
    price: 'From M1,200',
    image: 'https://i.pinimg.com/736x/10/4e/7d/104e7df53d27776c598b5c19797d178a.jpg',
    category: 'Nature'
  },
  {
    title: 'Katse Dam',
    location: 'Maseru District',
    price: 'From M950',
    image: 'https://i.pinimg.com/736x/aa/d8/08/aad80830ed5dad1a6318723ce57ddb21.jpg',
    category: 'Scenic'
  },
  {
    title: 'Liphofung Cave',
    location: 'Butha-Buthe',
    price: 'From M850',
    image: 'https://i.pinimg.com/1200x/ab/bd/c2/abbdc2f17a840e704c1c4a18ef14851c.jpg',
    category: 'Heritage'
  },
  {
    title: 'Thaba Bosiu',
    location: 'Maseru',
    price: 'From M650',
    image: 'https://i.pinimg.com/1200x/b1/0e/25/b10e256628130105765e1b1730887a6e.jpg',
    category: 'Culture'
  }
];

const services = [
  { name: 'Guided mountain hikes', category: 'Adventure', price: 'M1,200', description: 'Explore scenic peaks and highland trails with expert local guides.' },
  { name: 'Cultural village tours', category: 'Culture', price: 'M750', description: 'Learn Basotho traditions, music and heritage in a welcoming local setting.' },
  { name: 'Luxury lodge stays', category: 'Accommodation', price: 'M2,300', description: 'Relax in premium mountain lodges and boutique boutique experiences.' },
  { name: 'Road trip packages', category: 'Travel', price: 'M1,800', description: 'Discover Lesotho at your pace with comfortable transport and route planning.' },
  { name: 'Adventure sports', category: 'Adventure', price: 'M1,600', description: 'Try abseiling, zip-lining and challenging outdoor activities.' },
  { name: 'Wedding & event planning', category: 'Events', price: 'M3,500', description: 'Create memorable celebrations with a unique mountain backdrop.' }
];

const galleryImages = [
  'https://i.pinimg.com/736x/10/4e/7d/104e7df53d27776c598b5c19797d178a.jpg',
  'https://i.pinimg.com/736x/aa/d8/08/aad80830ed5dad1a6318723ce57ddb21.jpg',
  'https://i.pinimg.com/1200x/ab/bd/c2/abbdc2f17a840e704c1c4a18ef14851c.jpg',
  'https://i.pinimg.com/1200x/80/5d/42/805d42504f8e1ad0b79202a288a71c6e.jpg',
  'https://i.pinimg.com/1200x/8e/df/d5/8edfd5f89b0a1152fc9c2554a15656e2.jpg',
  'https://i.pinimg.com/1200x/b1/0e/25/b10e256628130105765e1b1730887a6e.jpg',
];

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('lesotho-theme', theme);
  const toggle = document.getElementById('themeToggle');
  if (toggle) {
    toggle.innerHTML = theme === 'dark' ? '<i class="bi bi-sun"></i> Light' : '<i class="bi bi-moon-stars"></i> Dark';
  }
}

function initializeTheme() {
  const savedTheme = localStorage.getItem('lesotho-theme') || 'light';
  setTheme(savedTheme);

  const toggle = document.getElementById('themeToggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const nextTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      setTheme(nextTheme);
    });
  }
}

function renderDestinations() {
  const container = document.getElementById('destinationCards');
  if (!container) return;

  container.innerHTML = destinations.map((place) => `
    <div class="col-lg-3 col-md-6 mb-4">
      <article class="card card-custom destination-card h-100 position-relative">
        <div class="price-tag">${place.price}</div>
        <img src="${place.image}" alt="${place.title}" class="card-img-top" />
        <div class="card-body">
          <span class="badge-soft">${place.category}</span>
          <h4 class="mt-3 mb-2">${place.title}</h4>
          <p class="text-muted mb-0"><i class="bi bi-geo-alt-fill me-2 text-primary"></i>${place.location}</p>
        </div>
      </article>
    </div>
  `).join('');
}

function renderServices() {
  const container = document.getElementById('serviceCards');
  if (!container) return;

  const filter = document.getElementById('serviceFilter');
  const search = document.getElementById('serviceSearch');

  function applyFilters() {
    const selectedCategory = filter ? filter.value : 'All';
    const query = search ? search.value.trim().toLowerCase() : '';

    const filtered = services.filter((service) => {
      const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
      const matchesSearch = service.name.toLowerCase().includes(query) || service.description.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });

    if (!filtered.length) {
      container.innerHTML = `<div class="col-12"><div class="alert alert-light border">No services match your search.</div></div>`;
      return;
    }

    container.innerHTML = filtered.map((service) => `
      <div class="col-lg-4 col-md-6 mb-4">
        <div class="card card-custom h-100">
          <div class="card-body">
            <span class="badge-soft">${service.category}</span>
            <h4 class="mt-3">${service.name}</h4>
            <p class="text-muted">${service.description}</p>
            <div class="d-flex justify-content-between align-items-center mt-3">
              <strong class="text-primary">${service.price}</strong>
              <button class="btn btn-primary btn-sm book-service" data-name="${service.name}">Book</button>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    document.querySelectorAll('.book-service').forEach((button) => {
      button.addEventListener('click', () => {
        const name = button.dataset.name;
        const destination = document.getElementById('serviceName');
        if (destination) {
          destination.value = name;
        }
        const bookingSection = document.getElementById('bookingCalculator');
        if (bookingSection) {
          bookingSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  if (filter) filter.addEventListener('change', applyFilters);
  if (search) search.addEventListener('input', applyFilters);
  applyFilters();
}

function renderGallery() {
  const gallery = document.getElementById('galleryGrid');
  if (!gallery) return;

  gallery.innerHTML = galleryImages.map((image, index) => `
    <div class="col-lg-4 col-md-6 mb-4">
      <img src="${image}" alt="Lesotho destination ${index + 1}" data-bs-toggle="modal" data-bs-target="#galleryModal" data-image="${image}" class="gallery-image shadow-sm" />
    </div>
  `).join('');

  document.querySelectorAll('.gallery-image').forEach((img) => {
    img.addEventListener('click', () => {
      const modalImage = document.getElementById('modalImage');
      if (modalImage) modalImage.src = img.dataset.image;
    });
  });
}

function initializeForms() {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const subject = document.getElementById('contactSubject').value.trim();
      const message = document.getElementById('contactMessage').value.trim();
      const output = document.getElementById('contactStatus');

      if (!name || !email || !subject || !message) {
        output.className = 'form-message error';
        output.textContent = 'Please complete all fields before sending your message.';
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        output.className = 'form-message error';
        output.textContent = 'Please enter a valid email address.';
        return;
      }

      output.className = 'form-message success';
      output.textContent = `Thank you, ${name}! Your request has been received and our team will respond shortly.`;
      contactForm.reset();
    });
  }

  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const fullName = document.getElementById('registerName').value.trim();
      const email = document.getElementById('registerEmail').value.trim();
      const password = document.getElementById('registerPassword').value;
      const confirmPassword = document.getElementById('registerConfirmPassword').value;
      const output = document.getElementById('registerStatus');

      if (!fullName || !email || !password || !confirmPassword) {
        output.className = 'form-message error';
        output.textContent = 'All registration fields are required.';
        return;
      }

      if (password.length < 8) {
        output.className = 'form-message error';
        output.textContent = 'Password must be at least 8 characters long.';
        return;
      }

      if (password !== confirmPassword) {
        output.className = 'form-message error';
        output.textContent = 'Passwords do not match. Please try again.';
        return;
      }

      const user = { fullName, email };
      localStorage.setItem('lesotho-user', JSON.stringify(user));
      output.className = 'form-message success';
      output.textContent = `Welcome aboard, ${fullName}! Your account has been created successfully.`;
      registerForm.reset();
    });
  }

  const savedUser = JSON.parse(localStorage.getItem('lesotho-user') || 'null');
  const welcomeLabel = document.getElementById('welcomeUser');
  if (welcomeLabel && savedUser) {
    welcomeLabel.textContent = `Welcome back, ${savedUser.fullName}!`;
  }
}

function initializeBookingCalculator() {
  const form = document.getElementById('bookingCalculatorForm');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const days = Number(document.getElementById('travelDays').value) || 0;
    const accommodation = Number(document.getElementById('accommodationCost').value) || 0;
    const activities = Number(document.getElementById('activityCost').value) || 0;
    const total = (days * 250) + accommodation + activities;
    const result = document.getElementById('bookingTotal');
    result.textContent = `Estimated total: M${total.toLocaleString()}`;
  });
}

function setCurrentYear() {
  const year = document.getElementById('currentYear');
  if (year) {
    year.textContent = new Date().getFullYear();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initializeTheme();
  renderDestinations();
  renderServices();
  renderGallery();
  initializeForms();
  initializeBookingCalculator();
  setCurrentYear();
});
