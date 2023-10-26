<template>
	<v-card>
		<v-card-title class="content__headline d-flex align-text-center">
			<span class="d-flex align-text-center">Análise da tarefa</span>
			<v-spacer></v-spacer>
		</v-card-title>

		<v-layout v-if="isLoading" class="pt-4">
			<v-spacer></v-spacer>
			<v-progress-circular indeterminate></v-progress-circular>
			<v-spacer></v-spacer>
		</v-layout>

		<v-container fluid v-else>
			<v-card>
				<v-card-title>Análise geral</v-card-title>
				<v-card-text>
					Probabilidade de acerto por dificuldade:
					<br>

					<span>Fácil: <v-chip :color="parseColor(currentAnalyse.hitByLevel.level1.hit)">{{
						parsePorcentage(currentAnalyse.hitByLevel.level1.hit)
					}}%</v-chip></span> /
					<span>Médio: <v-chip :color="parseColor(currentAnalyse.hitByLevel.level2.hit)">{{
						parsePorcentage(currentAnalyse.hitByLevel.level2.hit)
					}}%</v-chip></span> /
					<span>Difícil: <v-chip :color="parseColor(currentAnalyse.hitByLevel.level3.hit)">{{
						parsePorcentage(currentAnalyse.hitByLevel.level3.hit)
					}}%</v-chip></span>
				</v-card-text>

				<v-divider></v-divider>

				<v-card-text>
					Tempo de resposta correta por dificuldade:
					<br>

					<span>Fácil: <v-chip>{{ parseSeconds(currentAnalyse.hitByTime.level1) }}s</v-chip></span> /
					<span>Médio: <v-chip>{{ parseSeconds(currentAnalyse.hitByTime.level2) }}s</v-chip></span> /
					<span>Difícil: <v-chip>{{ parseSeconds(currentAnalyse.hitByTime.level3) }}s</v-chip></span>
				</v-card-text>

				<v-divider></v-divider>

				<v-card-text>Tempo de resposta por dificuldade:
					<br>

					<span>Fácil: <v-chip>{{ parseSeconds(currentAnalyse.timeByLevel.level1) }}s</v-chip></span> /
					<span>Médio: <v-chip>{{ parseSeconds(currentAnalyse.timeByLevel.level2) }}s</v-chip></span> /
					<span>Difícil: <v-chip>{{ parseSeconds(currentAnalyse.timeByLevel.level3) }}s</v-chip></span>
				</v-card-text>

				<v-divider></v-divider>

				<v-card-text>Probabilidade de acerto ao sair 1 vez:
					<v-chip :color="parseColor(currentAnalyse.focusOut.hit)">{{ parsePorcentage(currentAnalyse.focusOut.hit)
					}}%</v-chip>
				</v-card-text>
			</v-card>


			<v-divider class="py-1"></v-divider>

			<v-card-title>Análise individual</v-card-title>

			<v-expansion-panels multiple>
				<v-expansion-panel v-for="(userTask, index) in allUserTasks" :key="index">
					<template #title>
						<v-layout>
							<span>{{ userTask.user.name }}</span>
							<v-spacer></v-spacer>

							<v-chip v-if="userTask.status === 1" color="blue">Pendente</v-chip>
							<v-chip v-else color="green">Concluído</v-chip>
						</v-layout>
					</template>

					<template #text>
						<v-card-text>
							Probabilidade de acerto por dificuldade:
							<br>

							<span>Fácil: <v-chip :color="parseColor(userTask.hitByLevel.level1.hit)">{{
								parsePorcentage(userTask.hitByLevel.level1.hit)
							}}%</v-chip></span> /
							<span>Médio: <v-chip :color="parseColor(userTask.hitByLevel.level2.hit)">{{
								parsePorcentage(userTask.hitByLevel.level2.hit)
							}}%</v-chip></span> /
							<span>Difícil: <v-chip :color="parseColor(userTask.hitByLevel.level3.hit)">{{
								parsePorcentage(userTask.hitByLevel.level3.hit)
							}}%</v-chip></span>
						</v-card-text>

						<v-divider></v-divider>

						<v-card-text>
							Tempo de resposta correta por dificuldade:
							<br>

							<span>Fácil: <v-chip>{{ parseSeconds(userTask.hitByTime.level1) }}s</v-chip></span> /
							<span>Médio: <v-chip>{{ parseSeconds(userTask.hitByTime.level2) }}s</v-chip></span> /
							<span>Difícil: <v-chip>{{ parseSeconds(userTask.hitByTime.level3) }}s</v-chip></span>
						</v-card-text>

						<v-divider></v-divider>

						<v-card-text>Tempo de resposta por dificuldade:
							<br>

							<span>Fácil: <v-chip>{{ parseSeconds(userTask.timeByLevel.level1) }}s</v-chip></span> /
							<span>Médio: <v-chip>{{ parseSeconds(userTask.timeByLevel.level2) }}s</v-chip></span> /
							<span>Difícil: <v-chip>{{ parseSeconds(userTask.timeByLevel.level3) }}s</v-chip></span>
						</v-card-text>

						<v-divider></v-divider>

						<v-card-text>Probabilidade de acerto ao sair 1 vez:
							<v-chip :color="parseColor(userTask.focusOut.hit)">{{ parsePorcentage(userTask.focusOut.hit)
							}}%</v-chip>
						</v-card-text>

					</template>
				</v-expansion-panel>
			</v-expansion-panels>
		</v-container>

		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn>Voltar</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/app';
import { useUserTaskStore } from '@/store/userTask';
import { catchErrorDefault } from '@/utils';
import { ref } from 'vue';

const userTaskStore = useUserTaskStore();
const appStore = useAppStore();
const allUserTasks = ref([]);
const isLoading = ref(false);
const currentAnalyse = ref({});

const getUserTasks = () => {
	isLoading.value = true;

	userTaskStore.list(appStore.appUser.UserSubject[0].subjectId)
		.then((response: any) => {
			allUserTasks.value = response.result
			currentAnalyse.value = response.analyse;
		})
		.catch(catchErrorDefault)
		.finally(() => isLoading.value = false);
}

const parsePorcentage = (value: number) => {
	return (value * 100).toFixed(2);
}

const parseSeconds = (value: number) => {
	return value.toFixed(2);
}

const parseColor = (value: number) => {
	let parsedValue = (value * 100).toFixed(2)

	if (+parsedValue > 50) {
		return 'green'
	} else if (+parsedValue < 50) {
		return 'red'
	}
}

getUserTasks();
</script>

<style>
.v-card-text {
	padding: 8px !important;
}
</style>