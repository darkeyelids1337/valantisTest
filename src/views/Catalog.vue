<template>
  <div>
    <FilterComponent @toFilter="setFilter"></FilterComponent>
    <div class="cards">
      <v-skeleton-loader
        type="card"
        v-if="isLoading"
        width="100%"
      ></v-skeleton-loader>
      <ItemCard
        v-else
        v-for="item in data"
        :key="item.id"
        :productData="item"
      ></ItemCard>
    </div>
    <div class="text-center">
      <v-pagination v-model="page" :length="10" rounded="0"></v-pagination>
      <!-- Точной длины пагинации не знаем -->
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import ItemCard from "@/components/ItemCard.vue";
import FilterComponent from "@/components/FilterComponent.vue";
import { ref, watch, computed, onMounted } from "vue";
import { message, onlyUnique } from "@/utils";
import { BASEURL } from "../constants/index";
const page = ref(1);
const ids = ref(null);
const data = ref(null);
const filter = ref(null);
const filtered = ref(false);
const isLoading = ref(true);
const emits = defineEmits(["toFilter"]);
const setFilter = (val, name) => {
  filter.value = { [`${name}`]: val };
};

const getIdsBody = computed(() => {
  return {
    action: "get_ids",
    params: { offset: page.value > 1 ? (page.value - 1) * 50 : 0, limit: 50 },
  };
});

const getItemsBody = computed(() => {
  return {
    action: "get_items",
    params: { ids: ids.value },
  };
});

const getFilteredBody = computed(() => {
  return {
    action: "filter",
    params: filter.value,
  };
});

async function getIds() {
  const res = await axios
    .post(`${BASEURL}`, getIdsBody.value, {
      headers: {
        "X-Auth": message,
      },
    })
    .catch(async function (error) {
      console.log(error.toJSON());
    });
  if (!res) {
    await getItems();
  }
  const idsNonFiltered = await res.data.result;
  const unique = await idsNonFiltered.filter(onlyUnique);
  ids.value = unique;
}
async function getFilteredIds() {
  const res = await axios
    .post(`${BASEURL}`, getFilteredBody.value, {
      headers: {
        "X-Auth": message,
      },
    })
    .catch(async function (error) {
      console.log(error.toJSON());
    });
  if (!res) {
    await getItems(true);
  } else {
    const idsNonFiltered = await res.data.result;
    const unique = await idsNonFiltered.filter(onlyUnique);
    ids.value = unique;
  }
}
async function getItems(filtered) {
  isLoading.value = true;
  filtered ? await getFilteredIds() : await getIds();
  const res = await axios
    .post(`${BASEURL}`, getItemsBody.value, {
      headers: {
        "X-Auth": message,
      },
    })
    .catch(function (error) {
      console.log(error.toJSON());
    });
  if (res) {
    data.value = await res.data.result;
    isLoading.value = false;
  } else {
    await getItems();
    
  }
}
onMounted(() => getItems());
watch(filter, () => getItems(true));
watch(page, () => getItems());
</script>

<style scoped>
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
}
</style>
