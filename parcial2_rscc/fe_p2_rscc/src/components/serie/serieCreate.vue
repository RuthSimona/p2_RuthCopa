<script setup lang="ts">
import { ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'

const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
const titulo = ref('')
const sinopsis = ref('')
const director = ref('')
const temporadas = ref(0)
const fechaEstreno = ref('')
const categoria = ref('')

async function crearSerie() {
  const nuevaSerie = {
    titulo: titulo.value,
    sinopsis: sinopsis.value,
    director: director.value,
    temporadas: temporadas.value,
    fecha_estreno: fechaEstreno.value,
    categoria: categoria.value
  }

  await http
    .post(ENDPOINT, nuevaSerie)
    .then(() => router.push('/serie'))
    .catch((error) => console.error('Error al crear la serie:', error))
}

function goBack() {
  router.go(-1)
}
</script>

<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/">Inicio</router-link></li>
        <li class="breadcrumb-item">
          <router-link to="/serie">Series</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Crear</li>
      </ol>
    </nav>

    <div class="row">
      <h2>Crear Nueva Serie</h2>
    </div>

    <div class="row">
      <form @submit.prevent="crearSerie">
        <div class="form-floating mb-3">
          <input type="text" class="form-control" v-model="titulo" placeholder="Título" required />
          <label for="titulo">Título</label>
        </div>
        <div class="form-floating mb-3">
          <textarea
            class="form-control"
            v-model="sinopsis"
            placeholder="Sinopsis"
            required
          ></textarea>
          <label for="sinopsis">Sinopsis</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            v-model="director"
            placeholder="Director"
            required
          />
          <label for="director">Director</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="number"
            class="form-control"
            v-model="temporadas"
            placeholder="Temporadas"
            required
          />
          <label for="temporadas">Temporadas</label>
        </div>
        <div class="form-floating mb-3">
          <input type="date" class="form-control" v-model="fechaEstreno" required />
          <label for="fechaEstreno">Fecha de Estreno</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            v-model="categoria"
            placeholder="Categoría"
            required
          />
          <label for="categoria">Categoría</label>
        </div>
        <div class="text-center mt-3">
          <button type="submit" class="btn btn-primary btn-lg">
            <font-awesome-icon icon="fa-solid fa-save" /> Crear
          </button>
        </div>
      </form>
    </div>
    <div class="text-left">
      <button class="btn btn-link" @click="goBack">Volver</button>
    </div>
  </div>
</template>

<style scoped></style>
