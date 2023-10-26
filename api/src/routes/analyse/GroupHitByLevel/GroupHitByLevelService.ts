import prismaClient from "@/prisma";
import { NeuralNetwork } from 'brain.js';

export class GroupHitByLevelService {
	async execute(subjectId?: number, userId?: number) {
		try {
			let neuralNetworkTrainingData = [];
			let where: any = {};

			if (userId !== undefined) {
				where.userTask = {};
				where.userTask.userId = +userId;
			}

			if (subjectId !== undefined) {
				if (where.userTask === undefined) {
					where.userTask = {};
				}

				where.userTask.task = {};
				where.userTask.task.subjectId = +subjectId;
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
					input: { level: userTaskQuestion.question.level},
					output: { hit }
				})
			}
			
			if (neuralNetworkTrainingData.length === 0) {
				return {message: 'Não há dados disponíveis.'}
			}

			const net = new NeuralNetwork();
			net.train(neuralNetworkTrainingData);
			
			return {
				level1: net.run({ level: 1 }),
				level2: net.run({ level: 2 }),
				level3: net.run({ level: 3 }),
			}
		} catch (error) {
			console.log(error);
		}
	}
}