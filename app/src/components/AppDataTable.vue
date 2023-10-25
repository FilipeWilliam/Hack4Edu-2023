<template>
  <v-data-table-server :headers="(headers as any)" :items="(items as any)" :items-length.sync="totalApiResults"
    :loading="loading" @update:options="getDataFromApi" v-model:items-per-page="options.limit">

    <template v-for="(_, name) in $slots" :key="" v-slot:[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>

  </v-data-table-server>
</template>

<script lang="ts">
import { catchErrorDefault } from '@/utils';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    headers: {},
    items: {},
    getData: {
      type: Function
    }
  },
  setup(props) {
    let options = ref({
      page: 1,
      limit: 15
    });

    let totalApiResults = ref(0);
    let loading = ref(true);

    const getDataFromApi = (apiParams: { page: number, itemsPerPage: number, sortBy: any }) => {
      setTimeout(() => {
        loading.value = true;
        options.value.page = apiParams.page;
        options.value.limit = apiParams.itemsPerPage;

        props.getData!()
          .then((response: any) => totalApiResults.value = response.total)
          .catch(catchErrorDefault)
          .finally(() => loading.value = false);
      }, 100);
    };

    return {
      loading,
      totalApiResults,
      options,
      getDataFromApi
    }
  },
})
</script>