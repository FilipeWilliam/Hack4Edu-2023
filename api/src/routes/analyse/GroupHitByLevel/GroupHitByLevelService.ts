import prismaClient from "@/prisma";
import { NeuralNetwork } from 'brain.js';

export class GroupHitByLevelService {
	async execute(subjectId: number) {
		try {
			let neuralNetworkTrainingData = [];

			let allQuestions = await prismaClient.userTaskQuestions.findMany({
				where: {
					question: {
						task: {
							subjectId
						}
					}
				},
				include: {
					question: true
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