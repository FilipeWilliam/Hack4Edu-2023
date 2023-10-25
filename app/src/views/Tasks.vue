<template>
  <v-card>
    <v-card-title class="content__headline">Tarefas</v-card-title>

    <AppDataTable :headers="(headers as any)" :items="taskStore.allTasks" :get-data="listTasks">
      <template #item.subject="{ item }">
        {{ getHeadearsName(item).subject }}
      </template>

      <template #item.periodStart="{ item }">
        {{ formattedDate(getHeadearsName(item).periodStart) }}
      </template>

      <template #item.periodEnd="{ item }">
        {{ formattedDate(getHeadearsName(item).periodEnd) }}
      </template>

      <template #item.actions="{ item }">
        <v-btn small flat icon="mdi-pencil" @click="$router.push('/tasks/' + item.id)"></v-btn>
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
import { useTaskStore } from '@/store/task';
import { userTypes } from '@/store/user';
import { formattedDate } from '@/utils';

let taskStore = useTaskStore();
let appStore = useAppStore();

const headers = [
  {
    title: 'Disciplina',
    align: 'left',
    key: 'subject',
    sortable: false,
  },
  {
    title: 'Data de início',
    align: 'left',
    key: 'periodStart',
    sortable: false,
  },
  {
    title: 'Data de término',
    align: 'left',
    key: 'periodEnd',
    sortable: false,
  },
  {
    title: 'Ações',
    align: 'right',
    key: 'actions',
    sortable: false,
  },
]

const moveToEdit = (item: any) => {
  console.log(item);
}

const listTasks = () => {
  return new Promise((resolve, reject) => {
    taskStore.list()
      .then(resolve)
      .catch(reject);
  });
}

const getHeadearsName = (item: any) => {

  console.log(item)
  if ((appStore as any).type === userTypes.Student) {
    return {
      periodStart: item.task.periodStart,
      periodEnd: item.task.periodEnd,
      subject: item.task.subject.name
    }
  }

  return {
    periodStart: item.periodStart,
    periodEnd: item.periodEnd,
    subject: item.subject.name,
  }
}

</script>

<style></style>