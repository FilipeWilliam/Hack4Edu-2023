<template>
	<v-card>
		<v-card-title class=" content__headline">Cadastrar Tarefa</v-card-title>

		<v-form @submit.prevent="submit">
			<v-container fluid>
				<v-row>
					<v-col cols="3">
						<v-text-field v-model="(taskStore.registerTask as any).periodStart" label="Data de início"
							type="datetime-local" hide-details variant="outlined"></v-text-field>
					</v-col>

					<v-col cols="3">
						<v-text-field v-model="(taskStore.registerTask as any).periodEnd" label="Data de término"
							type="datetime-local" hide-details variant="outlined"></v-text-field>
					</v-col>
				</v-row>
			</v-container>

			<v-tabs v-model="tab">
				<v-tab v-for="(item, index) in taskStore.registerTask.questions" :value="index">Questão {{ index + 1
				}}</v-tab>
			</v-tabs>

			<v-card-text>
				<v-window v-model="tab">
					<v-window-item v-for="(item, index) in taskStore.registerTask.questions" :value="index">
						<v-container fluid class="pt-2 pb-0">
							<v-text-field v-model="item.title" label="Pergunta" variant="outlined" append-icon="mdi-robot"
								@click:append="openDialogGPT"></v-text-field>

							<v-radio-group class="alternatives__wrapper" v-model="item.correctAlternative">
								<v-radio :value="1">
									<template #label>
										<v-text-field v-model="item.alternative1" label="Alternativa 1" variant="outlined"
											hide-details></v-text-field>
									</template>
								</v-radio>

								<v-radio :value="2">
									<template #label>
										<v-text-field v-model="item.alternative2" label="Alternativa 2" variant="outlined"
											hide-details></v-text-field>
									</template>
								</v-radio>

								<v-radio :value="3">
									<template #label>
										<v-text-field v-model="item.alternative3" label="Alternativa 3" variant="outlined"
											hide-details></v-text-field>
									</template>
								</v-radio>

								<v-radio :value="4">
									<template #label>
										<v-text-field v-model="item.alternative4" label="Alternativa 4" variant="outlined"
											hide-details></v-text-field>
									</template>
								</v-radio>
							</v-radio-group>

							<hr class="mb-3">

							<p>Dificuldade:</p>
							<v-chip-group selected-class="text-primary" v-model="item.level" filter>
								<v-chip variant="outlined" value="1">Fácil</v-chip>

								<v-chip value="2" variant="outlined">Médio</v-chip>

								<v-chip value="3" variant="outlined">Difícil</v-chip>
							</v-chip-group>

						</v-container>
					</v-window-item>
				</v-window>

				<v-layout>
					<v-spacer></v-spacer>
					<v-btn class="mr-2" @click="addQuestion">Adicionar questão</v-btn>
					<v-btn color="primary" type="submit">Salvar</v-btn>
				</v-layout>
			</v-card-text>
		</v-form>
	</v-card>

	<DialogGPTQuestion ref="dialogGpt" />
</template>
  
<script lang="ts" setup>
import DialogGPTQuestion from '@/components/DialogGPTQuestion.vue';
import { useTaskStore } from '@/store/task';
import { catchErrorDefault, handleAPISuccess } from '@/utils';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const currentTaskId = useRoute().params.id;
const taskStore = useTaskStore();
const tab = ref(null);
const dialogGpt = ref(null);

const submit = () => {
	taskStore.create(taskStore.registerTask)
		.then(handleAPISuccess)
		.catch(catchErrorDefault);
}

const addQuestion = () => {
	taskStore.registerTask.questions.push({
		title: '',
		alternative1: '',
		alternative2: '',
		alternative3: '',
		alternative4: '',
		correctAlternative: null,
		level: null
	})
}

const readTask = () => {
	taskStore.read(currentTaskId)
		.catch(catchErrorDefault);
}

const clearCurrentRegister = () => {
	taskStore.registerTask = {
		questions: [
			{
				title: '',
				alternative1: '',
				alternative2: '',
				alternative3: '',
				alternative4: '',
				correctAlternative: null,
				level: null
			}
		]
	}
}

const openDialogGPT = () => {
	(dialogGpt.value! as any).openDialog()
}

clearCurrentRegister();
if (currentTaskId !== undefined) {
	readTask();
}
</script>
  
<style>
.alternatives__wrapper .v-selection-control-group {
	gap: 15px;
}

.alternatives__wrapper .v-label {
	width: 50%;
}
</style>