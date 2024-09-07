<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Daftar Produk</h1>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <div class="d-flex justify-content-center mb-3">
      <button class="btn btn-slide me-2" @click="slideTo('left')" :disabled="currentSlide === 0">
        <i class="bi bi-chevron-left me-2"></i> Sebelumnya
      </button>
      <button class="btn btn-slide" @click="slideTo('right')" :disabled="currentSlide === 1">
        <i class="bi bi-chevron-right me-2"></i> Berikutnya
      </button>
      <div class="slide-indicator">
        <span :class="{ active: currentSlide === 0 }"></span>
        <span :class="{ active: currentSlide === 1 }"></span>
      </div>
    </div>

    <transition name="slide-fade-elegant">
      <table class="table table-bordered table-hover shadow-lg" v-if="currentSlide === 0">
        <thead class="thead-custom">
          <tr>
            <th>No</th>
            <th><i class="bi bi-box-seam me-2"></i>Nama Produk</th>
            <th><i class="bi bi-card-text me-2"></i>Deskripsi</th>
            <th><i class="bi bi-currency-dollar me-2"></i>Harga</th>
            <th><i class="bi bi-boxes me-2"></i>Stok</th>
            <th><i class="bi bi-gear-fill me-2"></i>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(produk, index) in produkList.slice(0, 5)" :key="produk.id">
            <td>{{ index + 1 }}</td>
            <td>{{ produk.nama_produk }}</td>
            <td>{{ produk.deskripsi }}</td>
            <td>{{ formatHarga(produk.harga) }}</td>
            <td>{{ produk.stok }}</td>
            <td>
              <button class="btn btn-primary btn-sm me-2" @click="editProduk(produk)">
                <i class="bi bi-pencil-square"></i> Edit
              </button>
              <button class="btn btn-danger btn-sm" @click="deleteProduk(produk.id)">
                <i class="bi bi-trash"></i> Hapus
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </transition>

    <transition name="slide-fade-elegant">
      <table class="table table-bordered table-hover shadow-lg" v-if="currentSlide === 1">
        <thead class="thead-custom">
          <tr>
            <th>No</th>
            <th><i class="bi bi-box-seam me-2"></i>Nama Produk</th>
            <th><i class="bi bi-card-text me-2"></i>Deskripsi</th>
            <th><i class="bi bi-currency-dollar me-2"></i>Harga</th>
            <th><i class="bi bi-boxes me-2"></i>Stok</th>
            <th><i class="bi bi-gear-fill me-2"></i>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(produk, index) in produkList.slice(5, 10)" :key="produk.id">
            <td>{{ index + 6 }}</td>
            <td>{{ produk.nama_produk }}</td>
            <td>{{ produk.deskripsi }}</td>
            <td>{{ formatHarga(produk.harga) }}</td>
            <td>{{ produk.stok }}</td>
            <td>
              <button class="btn btn-primary btn-sm me-2" @click="editProduk(produk)">
                <i class="bi bi-pencil-square"></i> Edit
              </button>
              <button class="btn btn-danger btn-sm" @click="deleteProduk(produk.id)">
                <i class="bi bi-trash"></i> Hapus
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const produkList = ref([])
const error = ref(null)
const router = useRouter()
const currentSlide = ref(0) // Slide awal

const fetchProduk = async () => {
  try {
    const response = await axios.get('http://localhost:3000/produk')
    produkList.value = response.data
  } catch (err) {
    error.value = 'Terjadi kesalahan saat mengambil data produk.'
  }
}

const editProduk = (produk) => {
  router.push({ name: 'EditProduk', params: { id: produk.id } })
}

const deleteProduk = async (id) => {
  if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
    try {
      await axios.delete(`http://localhost:3000/produk/${id}`)
      produkList.value = produkList.value.filter((produk) => produk.id !== id)
    } catch (err) {
      error.value = 'Terjadi kesalahan saat menghapus produk.'
    }
  }
}

const formatHarga = (harga) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(harga)
}

const slideTo = (direction) => {
  if (direction === 'right' && currentSlide.value < 1) {
    currentSlide.value++
  } else if (direction === 'left' && currentSlide.value > 0) {
    currentSlide.value--
  }
}

onMounted(fetchProduk)
</script>

<style scoped>
/* Tabel Styles */
.table {
  background-color: #ffffff;
  border-collapse: separate;
  border-radius: 0.5rem;
}

.table thead {
  background-color: #007bff;
  color: #ffffff;
  text-align: center;
}

.table thead th {
  padding: 0.75rem;
}

.table tbody tr {
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;
}

.table tbody tr:hover {
  background-color: #f1f5f9;
  transform: translateY(-3px);
}

.table td,
.table th {
  vertical-align: middle;
  padding: 1rem;
}

.shadow-lg {
  box-shadow: 0 0 1.5rem rgba(0, 0, 0, 0.2);
}

/* Tombol Slide */
.btn-slide {
  background-color: #007bff;
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  color: white;
  font-size: 1.125rem;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease, transform 0.3s ease;
  border: none; /* Menghapus border */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Bayangan tombol */
}

.btn-slide i {
  font-size: 1.25rem;
}

.btn-slide:hover {
  background-color: #0056b3;
  transform: scale(1.05); /* Memperbesar tombol saat hover */
}

.btn-slide:disabled {
  background-color: #b3d1ff;
  cursor: not-allowed;
}

/* Transisi slide */
.slide-fade-elegant-enter-active,
.slide-fade-elegant-leave-active {
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}

.slide-fade-elegant-enter,
.slide-fade-elegant-leave-to {
  opacity: 0;
  transform: translateX(50%);
}

/* Indikator slide */
.slide-indicator {
  display: flex;
  gap: 0.5rem;
}

.slide-indicator span {
  display: block;
  width: 12px;
  height: 12px;
  background-color: #007bff;
  border-radius: 50%;
  transition: background-color 0.3s ease;
}

.slide-indicator .active {
  background-color: #0056b3;
}
</style>
