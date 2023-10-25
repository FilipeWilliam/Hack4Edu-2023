import prismaClient from "@/prisma";

export class ListGptQuestionsService {
	async execute(theme?: string) {
		try {
			let gtpQuestions = await prismaClient.gptQuestions.findMany({
				where: {
					title: {
						mode: 'insensitive',
						contains: theme
					}
				},
			})

			if (gtpQuestions.length > 0) {
				const randomIndex = Math.floor(Math.random() * gtpQuestions.length);
				const randomQuestion = gtpQuestions[randomIndex];
				return { result: randomQuestion };
			}
			
			return {message: 'Não foi possível gerar uma questão com esse tema. Por favor, tente outro.'}

		} catch (error) {
			console.log(error);
		}
	}
}