const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors'); // Tambahkan ini
const sequelize = new Sequelize('db_jamu', 'postgres', 'MAMANGDANU1', {
    host: 'localhost',
    dialect: 'postgres'
});

const app = express();
app.use(express.json());

// Gunakan middleware CORS
app.use(cors({
  origin: '*', // Izinkan semua origin, sesuaikan jika perlu
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

const User = sequelize.define('User', {
  nama_produk: {
    type: Sequelize.STRING,
    allowNull: false
  },
  deskripsi: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  harga: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  stok: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
}, {
  tableName: 'tb_jamuku',
  timestamps: true
});

// Rute Read (GET)
app.get('/produk', async (req, res) => {
  try {
    const produk = await User.findAll();
    res.json(produk);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rute Create (POST)
app.post('/produk', async (req, res) => {
  try {
    const newProduk = await User.create(req.body);
    res.status(201).json(newProduk);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rute Update (PUT)
app.put('/produk/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await User.update(req.body, {
      where: { id: id }
    });
    
    if (updated) {
      const updatedProduk = await User.findByPk(id);
      res.status(200).json(updatedProduk);
    } else {
      res.status(404).json({ message: 'Produk tidak ditemukan' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rute Delete (DELETE)
app.delete('/produk/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.destroy({
      where: { id: id }
    });
    
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Produk tidak ditemukan' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
