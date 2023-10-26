import prismaClient from "@/prisma";
import { NeuralNetwork } from 'brain.js';

export class GroupTimeByLevelService {
	async execute(subjectId: number) {
		try {
			let neuralNetworkTrainingData = [];
			let maxSeconds = 100;

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
				let startAt = userTaskQuestion.startedAt.getTime();
				let finishedAt = userTaskQuestion.finishedAt.getTime();
				let seconds = ((finishedAt - startAt) / 1000) / maxSeconds;

				neuralNetworkTrainingData.push({
					input: { level: userTaskQuestion.question.level},
					output: { seconds }
				})
			}
			
			const net = new NeuralNetwork();
			net.train(neuralNetworkTrainingData);
			
			let {seconds: seconds1} = net.run({ level: 1 }) as any;
			let {seconds: seconds2} = net.run({ level: 2 }) as any;
			let {seconds: seconds3} = net.run({ level: 3 }) as any;

			return {
				level1: seconds1 * maxSeconds,
				level2: seconds2 * maxSeconds,
				level3: seconds3 * maxSeconds,
			}
		} catch (error) {
			console.log(error);
		}
	}
}