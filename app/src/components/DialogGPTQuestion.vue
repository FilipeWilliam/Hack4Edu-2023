<template>
	<v-dialog v-model="dialog.open" width="500">
		<v-card>
			<v-card-title class="content__headline">Gerar questão</v-card-title>

			<v-container>
				<v-row>
					<v-col cols="12">
						<v-text-field v-model="questionGeneration" label="Tema" hide-details variant="outlined"></v-text-field>
					</v-col>
				</v-row>
			</v-container>

			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="primary" :loading="dialog.loading" @click="searchQuestion">Gerar</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
import { useQuestionStore } from '@/store/question';
import { useTaskStore } from '@/store/task';
import { catchErrorDefault } from '@/utils';
import { ref } from 'vue';

let dialog = ref({ open: false, loading: false });
let taskStore = useTaskStore();
let questionGeneration = ref('');
let questionStore = useQuestionStore()

let openDialog = () => {
	dialog.value.open = true;
}

let searchQuestion = () => {
	dialog.value.loading = true;

	questionStore.listGPT(questionGeneration.value)
		.then((response: any) => {
			let { title, alternative1, alternative2, alternative3, alternative4, level, correctAlternative } = response;
			taskStore.registerTask.questions[taskStore.registerTask.questions.length - 1] = {
				title,
				alternative1,
				alternative2,
				alternative3,
				alternative4,
				correctAlternative,
				level
			}
			closeDialog();
		})
		.catch(catchErrorDefault);
}

let closeDialog = () => {
	questionGeneration.value = '';
	dialog.value.open = false;
	dialog.value.loading = false;
}

defineExpose({
	openDialog,
})

</script>