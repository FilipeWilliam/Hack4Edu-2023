<template>
  <v-card class="question__card">
    <v-card-title class="question__index">Questão {{ currentQuestion }}</v-card-title>

    <template v-if="loading">
      <div class="d-flex justify-center align-center">
        <v-progress-circular indeterminate></v-progress-circular>
      </div>
    </template>

    <template v-else>
      <v-card-title class="question__title">{{ questionData.title }}</v-card-title>

      <v-container>
        <v-row>
          <v-col class="question__alternative" :class="{ 'question__alternative--wrong': alternative.isWrong }"
            v-for="(alternative, index) in questionData.alternatives" :key="index" cols="6">
            <v-card @click="chooseAlternative(index)">
              <v-card-text class="text-center">{{ alternative.text }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </v-card>
</template>

<script lang="ts" setup>
import { useTaskStore } from '@/store/task';
import { useUserTaskStore } from '@/store/userTask';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

let currentQuestion = ref(1);
let loading = ref(true);
let questionData = ref({
  id: 0,
  title: '',
  alternatives: []
});
let taskStore = useTaskStore();
let userTaskStore = useUserTaskStore();
let currentUserTaskId = useRoute().params.id;

let getQuestion = () => {
  loading.value = true;

  taskStore.read(currentUserTaskId)
    .then((response: any) => {
      questionData.value.alternatives = response.data.alternatives;
      questionData.value.title = response.data.title;
      questionData.value.id = response.data.id;
    })
    .catch(console.log)
    .finally(() => loading.value = false);
}

let chooseAlternative = (alternativeIndex: number) => {
  userTaskStore.answerQuestion({
    userTaskId: currentUserTaskId,
    questionId: questionData.value.id,
    alternative: alternativeIndex,
  })
    .then(() => checkAnswer())
    .catch(console.log)
}

let checkAnswer = () => {
  questionData.value.alternatives.forEach((alternative) => {
    if (!alternative.isCorrect) {
      alternative.isWrong = true;
    }
  })
}

getQuestion();
</script>


<style>
.user__data {
  position: absolute;
  top: 20px;
  right: 20px;
}

.question__card {
  height: 450px;
  display: flex !important;
  flex-direction: column;
  justify-content: space-between;
}

.question__card .question__index {
  text-align: center;
  background: rgb(var(--v-theme-primary));
  color: #FFF;
  text-shadow: 0 0 3px #000;
}

.question__title {
  text-overflow: initial !important;
  white-space: normal !important;
  height: 200px;
  display: flex !important;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.question__alternative .v-card {
  color: #FFF;
}

.question__alternative--wrong .v-card {
  background-color: grey !important;
}

.question__alternative:nth-child(1) .v-card {
  background-color: red;
}

.question__alternative:nth-child(2) .v-card {
  background-color: green;
}

.question__alternative:nth-child(3) .v-card {
  background-color: blue;
}

.question__alternative:nth-child(4) .v-card {
  background-color: purple;
}
</style>