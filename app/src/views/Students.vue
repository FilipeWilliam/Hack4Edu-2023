<template>
  <v-card>
    <v-card-title class="content__headline">Estudantes</v-card-title>

    <AppDataTable :headers="(headers as any)" :items="subjectStore.currentSubject.UserSubject" :get-data="readSubject">
      <template #item.name="{ item }">
        {{ item.user.name }}
      </template>

      <template #item.createdAt="{ item }">
        {{ formattedDate(item.createdAt) }}
      </template>
    </AppDataTable>

  </v-card>

  <v-layout-item model-value position="bottom" class="text-end" size="88">
    <div class="ma-4">
      <v-btn icon="mdi-plus" size="large" color="primary" elevation="8" @click="$router.push('/tasks/new')" />
    </div>
  </v-layout-item>
</template>

<script lang="ts" setup>
import AppDataTable from '@/components/AppDataTable.vue';
import { useAppStore } from '@/store/app';
import { useSubjectStore } from '@/store/subject';
import { formattedDate } from '@/utils';

let appStore = useAppStore();
let subjectStore = useSubjectStore();

const headers = [
  {
    title: 'Nome',
    align: 'left',
    key: 'name',
    sortable: false,
  },
  {
    title: 'Data da matrícula',
    align: 'left',
    key: 'createdAt',
    sortable: false,
  },
]

const readSubject = () => {
  return new Promise((resolve, reject) => {
    subjectStore.read(appStore.appUser.UserSubject[0].subjectId)
      .then((response) => {
        response.total = response.UserSubject.length;
        resolve(response)
      })
      .catch(reject);
  });
}
</script>

<style></style>