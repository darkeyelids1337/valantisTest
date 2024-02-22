<template>
  <div>
    <v-sheet class="ma-2 pa-2" style="max-width: 500px; width: 100%;">
      <v-card class="product">

        <v-card-title>
           {{  props.productData.brand ? props.productData.brand : `NoName`}} 
        </v-card-title>

        <v-card-subtitle> {{ props.productData.price }} Руб. </v-card-subtitle>

        <v-card-text style="max-width: 250px;">
          {{ props.productData.product }}
        </v-card-text>
        <v-card-text>
          id: {{ props.productData.id }}
        </v-card-text>
      </v-card>
    </v-sheet>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({
  productData: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
</style>
