<template>
  <div class="filter-component">
    <div>Отфильтровать по:</div>
    <div class="filter-items">
      <div class="filter-item">
        <v-btn variant="outlined" @click="isPrice = !isPrice">Price </v-btn>
        <div v-if="isPrice" class="filter-input">
          <v-text-field
            label="Пример: 17500"
            hide-details="auto"
            width="344"
            v-model="price"
          ></v-text-field>
          <v-btn type="button" @click="$emit('toFilter', +price, 'price')">Применить</v-btn>
        </div>
      </div>
      <div class="filter-item">
        <v-btn variant="outlined" @click="isName = !isName"> Name </v-btn>
        <div v-if="isName" class="filter-input">
          <v-text-field
            v-model="name"
            label="Пример: Золотое кольцо"
            hide-details="auto"
          ></v-text-field>
          <v-btn type="button" @click="$emit('toFilter', name, 'name')">Применить</v-btn>
        </div>
      </div>
      <div class="filter-item">
        <v-btn variant="outlined" @click="isBrand = !isBrand"> Brand </v-btn>
        <div v-if="isBrand" class="filter-input">
          <v-text-field
            label="Пример: Brand"
            v-model="brand"
            hide-details="auto"
          ></v-text-field>
          <v-btn type="button" @click="$emit('toFilter', brand, 'brand')">Применить</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const isPrice = ref(false);
const isName = ref(false);
const isBrand = ref(false);

const price = ref('')
const name = ref('')
const brand = ref('')   



</script>

<style scoped>
.filter-component {
  display: flex;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  gap: 30px;
}
.filter-items {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.filter-item {
  display: flex;
}
.filter-input{
    width: 300px;
}
</style>
