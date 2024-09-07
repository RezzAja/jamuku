<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light shadow-lg">
      <div class="container">
        <a class="navbar-brand d-flex align-items-center" href="#">
          <i class="bi bi-cup-straw me-2"></i>Jamuku
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <RouterLink class="nav-link d-flex align-items-center" :to="{ name: 'Home' }">
                <i class="bi bi-house-door-fill me-2"></i>Home
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link d-flex align-items-center" :to="{ name: 'Posts' }">
                <i class="bi bi-file-earmark-text-fill me-2"></i>Posts
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <RouterView />
  </header>
</template>

<style scoped>
/* Tetapkan body dan html untuk memiliki tinggi penuh */
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

/* Buat elemen header dengan minimum tinggi 100vh */
header {
  position: relative;
  width: 100%;
  min-height: 100vh; /* 100% tinggi viewport */
  background: url('@/assets/images/jamu.jpg') no-repeat center center; /* Background image */
  background-size: cover; /* Pastikan background menutupi seluruh area */
  background-color: rgba(255, 255, 255, 0.5); /* Warna overlay transparan */
  backdrop-filter: blur(10px); /* Blur efek */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); /* Lebih dalam bayangan */
  padding: 1rem 0;
}

/* Atur konten agar tidak memengaruhi ukuran header */
.navbar {
  z-index: 10;
}

/* Tambahkan ikon pada navbar */
.navbar-brand i {
  font-size: 1.5rem;
  color: #007bff;
}

.nav-link i {
  font-size: 1.2rem;
  color: #007bff;
}

/* Efek transisi pada link navbar */
.nav-link {
  color: #333;
  font-weight: 500;
  transition:
    color 0.3s ease,
    background-color 0.3s ease,
    text-shadow 0.3s ease;
}

.nav-link:hover {
  color: #fff;
  background-color: #007bff;
  border-radius: 0.25rem;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.6); /* Stronger shadow on hover */
}

/* Efek hover pada ikon */
.nav-link i:hover {
  color: #fff;
}

/* Mobile responsiveness */
@media (max-width: 767px) {
  .navbar-nav {
    text-align: center;
    padding-top: 1rem;
    background-color: #ffffff; /* Background putih untuk navbar pada mobile */
    border-top: 1px solid #dee2e6;
  }

  .navbar-nav .nav-link {
    padding: 0.75rem 1.25rem;
    border-bottom: 1px solid #dee2e6;
  }

  .navbar-toggler {
    border: none;
    background-color: #007bff;
  }

  .navbar-toggler-icon {
    background-image: url('data:image/svg+xml;base64,...'); /* Custom icon jika diperlukan */
  }
}

/* Large screens */
@media (min-width: 992px) {
  .navbar-nav {
    margin-left: auto;
  }

  .navbar-nav .nav-link {
    padding: 0.5rem 1rem;
  }

  .navbar-toggler {
    display: none; /* Hide toggler button on larger screens */
  }
}
</style>
