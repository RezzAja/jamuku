<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4"><i class="bi bi-pencil-square"></i> Edit Produk</h1>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <form @submit.prevent="updateProduk">
      <div class="mb-4">
        <label for="nama_produk" class="form-label">
          <i class="bi bi-tag-fill me-2"></i>Nama Produk
        </label>
        <input
          type="text"
          id="nama_produk"
          v-model="produk.nama_produk"
          class="form-control"
          placeholder="Masukkan nama produk"
          required
        />
      </div>
      <div class="mb-4">
        <label for="deskripsi" class="form-label">
          <i class="bi bi-file-text-fill me-2"></i>Deskripsi
        </label>
        <textarea
          id="deskripsi"
          v-model="produk.deskripsi"
          class="form-control"
          rows="4"
          placeholder="Masukkan deskripsi produk"
          required
        ></textarea>
      </div>
      <div class="mb-4">
        <label for="harga" class="form-label">
          <i class="bi bi-currency-dollar me-2"></i>Harga
        </label>
        <input
          type="number"
          id="harga"
          v-model="produk.harga"
          class="form-control"
          placeholder="Masukkan harga produk"
          required
        />
      </div>
      <div class="mb-4">
        <label for="stok" class="form-label"> <i class="bi bi-box-seam me-2"></i>Stok </label>
        <input
          type="number"
          id="stok"
          v-model="produk.stok"
          class="form-control"
          placeholder="Masukkan stok produk"
          required
        />
      </div>
      <div class="d-flex justify-content-between">
        <button type="submit" class="btn btn-success btn-lg d-flex align-items-center">
          <i class="bi bi-save me-2"></i>Update Produk
        </button>
        <button
          type="button"
          class="btn btn-danger btn-lg d-flex align-items-center"
          @click="cancelEdit"
        >
          <i class="bi bi-x-circle me-2"></i>Batal
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const produk = ref({
  nama_produk: '',
  deskripsi: '',
  harga: 0,
  stok: 0
})
const error = ref(null)

const fetchProduk = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/produk/${route.params.id}`)
    produk.value = response.data
  } catch (err) {
    error.value = 'Terjadi kesalahan saat mengambil data produk.'
  }
}

const updateProduk = async () => {
  try {
    await axios.put(`http://localhost:3000/produk/${route.params.id}`, produk.value)
    router.push({ name: 'Home' })
  } catch (err) {
    error.value = 'Terjadi kesalahan saat memperbarui data produk.'
  }
}

const cancelEdit = () => {
  router.push({ name: 'Home' }) // Redirect ke halaman daftar produk jika batal
}

onMounted(fetchProduk)
</script>

<style scoped>
.container {
  max-width: 600px;
  background-color: #f9f9f9; /* Latar belakang putih lembut */
  padding: 2.5rem;
  border-radius: 15px; /* Radius sudut yang lebih besar */
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15); /* Bayangan yang lebih halus */
}

h1 {
  color: #007bff; /* Warna biru untuk judul */
  font-family: 'Poppins', sans-serif; /* Gaya font modern */
  font-weight: 600;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-label {
  font-weight: 600;
  color: #495057;
  display: flex;
  align-items: center;
}

.form-control {
  border-radius: 0.5rem; /* Radius lebih besar untuk input */
  border: 1px solid #ced4da;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.form-control:focus {
  border-color: #28a745;
  box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
}

.btn-success,
.btn-danger {
  font-size: 1.125rem;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  transition: transform 0.3s ease;
}

.btn-success:hover,
.btn-danger:hover {
  transform: scale(1.05); /* Sedikit membesar saat hover */
}

.alert {
  background-color: #f8d7da;
  color: #721c24;
  border-color: #f5c6cb;
  border-radius: 0.5rem;
  padding: 1rem;
}

.bi {
  font-size: 1.2rem;
  margin-right: 0.5rem;
}
</style>
