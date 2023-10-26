import prismaClient from "@/prisma";
import { NeuralNetwork } from 'brain.js';

export class GroupFocusOutByHitService {
	async execute(subjectId?: number, userId?: number) {
		try {
			let neuralNetworkTrainingData = [];
			let where: any = {};

			if (userId !== undefined) {
				where.userTask = {};
				where.userTask.userId = +userId;
			}

			if (subjectId !== undefined) {
				where.task = {};
				where.task.subjectId = +subjectId;
			}

			let allQuestions = await prismaClient.userTaskQuestions.findMany({
				where,
				include: {
					question: true,
					userTask: true
				}
			});

			for (let userTaskQuestion of allQuestions) {
				let hit: number;

				if (userTaskQuestion.alternative === userTaskQuestion.question.correctAlternative) {
					hit = 1;
				} else {
					hit = 0;
				}

				neuralNetworkTrainingData.push({
					input: { focusOut: userTaskQuestion.focusOut },
					output: { hit }
				});
			}

			if (neuralNetworkTrainingData.length === 0) {
				return {message: 'Não há dados disponíveis.'}
			}
			
			const net = new NeuralNetwork();
			net.train(neuralNetworkTrainingData);
			
			return {
				focusOut: net.run({ focusOut: 1 })
			}
		} catch (error) {
			console.log(error);
		}
	}
}