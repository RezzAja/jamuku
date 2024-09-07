<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Tambah Produk Baru</h1>
    <form @submit.prevent="addProduct">
      <div class="mb-4 position-relative">
        <label for="nama_produk" class="form-label">
          <i class="bi bi-box-seam me-2"></i> Nama Produk
        </label>
        <input type="text" class="form-control" id="nama_produk" v-model="nama_produk" required />
      </div>
      <div class="mb-4 position-relative">
        <label for="deskripsi" class="form-label">
          <i class="bi bi-file-earmark-text me-2"></i> Deskripsi
        </label>
        <textarea
          class="form-control"
          id="deskripsi"
          v-model="deskripsi"
          rows="4"
          required
        ></textarea>
      </div>
      <div class="mb-4 position-relative">
        <label for="harga" class="form-label">
          <i class="bi bi-currency-dollar me-2"></i> Harga
        </label>
        <input type="number" class="form-control" id="harga" v-model="harga" required />
      </div>
      <div class="mb-4 position-relative">
        <label for="stok" class="form-label"> <i class="bi bi-boxes me-2"></i> Stok </label>
        <input type="number" class="form-control" id="stok" v-model="stok" required />
      </div>
      <div class="d-flex justify-content-center">
        <button type="submit" class="btn btn-success btn-lg">
          <i class="bi bi-plus-circle me-2"></i> Tambah Produk
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const nama_produk = ref('')
const deskripsi = ref('')
const harga = ref(0)
const stok = ref(0)

const addProduct = async () => {
  try {
    const newProduct = {
      nama_produk: nama_produk.value,
      deskripsi: deskripsi.value,
      harga: harga.value,
      stok: stok.value
    }
    await axios.post('http://localhost:3000/produk', newProduct)
    router.push('/') // Redirect ke halaman daftar produk setelah menambahkan produk
  } catch (error) {
    console.error('Terjadi kesalahan saat menambahkan produk:', error)
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #007bff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 600;
}

.form-label {
  font-weight: 600;
  color: #495057;
  display: flex;
  align-items: center;
}

.form-label i {
  font-size: 1.2rem;
  color: #007bff;
}

.form-control {
  border-radius: 0.375rem;
  border: 1px solid #ced4da;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.form-control:focus {
  border-color: #28a745;
  box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
}

.btn-success {
  background-color: #28a745;
  border-color: #28a745;
  font-size: 1.125rem;
  font-weight: 600;
  display: flex;
  align-items: center;
}

.btn-success i {
  font-size: 1.2rem;
}

.btn-success:hover  {
  background-color: #218838;
  border-color: #1e7e34;
}

@media (max-width: 576px) {
  .container {
    padding: 1.5rem;
  }

  .btn-success {
    font-size: 1rem;
  }
}
</style>
