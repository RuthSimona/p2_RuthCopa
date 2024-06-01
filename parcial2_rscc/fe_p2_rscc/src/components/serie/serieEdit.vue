<script setup lang="ts">
import { onMounted, ref } from 'vue'
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
const id = router.currentRoute.value.params['id']

async function editarSerie() {
  await http
    .patch(`${ENDPOINT}/${id}`, {
      titulo: titulo.value,
      sinopsis: sinopsis.value,
      director: director.value,
      temporadas: temporadas.value,
      fecha_estreno: fechaEstreno.value,
      categoria: categoria.value
    })
    .then(() => {
      router.push('/serie') // Redirigir a la página de series después de editar exitosamente
    })
    .catch((error) => {
      console.error('Error al editar la serie:', error)
      // Manejar el error si es necesario
    })
}

async function getSerie() {
  await http.get(`${ENDPOINT}/${id}`).then((response) => {
    titulo.value = response.data.titulo
    sinopsis.value = response.data.sinopsis
    director.value = response.data.director
    temporadas.value = response.data.temporadas
    fechaEstreno.value = response.data.fecha_estreno
    categoria.value = response.data.categoria
  })
}

function goBack() {
  router.go(-1)
}

onMounted(() => {
  getSerie()
})
</script>

<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/">Inicio</RouterLink></li>
        <li class="breadcrumb-item">
          <RouterLink to="/serie">Series</RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Editar</li>
      </ol>
    </nav>
    <div class="row">
      <h2>Editar Serie</h2>
    </div>
    <div class="row">
      <form @submit.prevent="editarSerie">
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
          <input
            type="date"
            class="form-control"
            v-model="fechaEstreno"
            placeholder="Fecha de Estreno"
            required
          />
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
            <font-awesome-icon icon="fa-solid fa-save" /> Guardar
          </button>
        </div>
      </form>
    </div>
    <div class="text-left">
      <button class="btn btn-link" @click="goBack">Volver</button>
    </div>
  </div>
</template>

<style></style>
