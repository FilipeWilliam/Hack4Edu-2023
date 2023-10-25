import prismaClient from "../../../prisma";

export class CreateGptQuestionService {
  async execute(questions: Array<{title: string, alternative1: string, alternative2: string, alternative3: string, alternative4: string, correctAlternative: number, level: number}>) {
    try {
      for (let question of questions) {
        await prismaClient.gptQuestions.create({
          data: {
            title: question.title,
            alternative1: question.alternative1,
            alternative2: question.alternative2,
            alternative3: question.alternative3,
            alternative4: question.alternative4,
            correctAlternative: question.correctAlternative,
            level: question.level
          }
        });
      }

      return { message: 'Questões GPT cadastradas com sucesso!' };
    } catch (error) {
      console.log(error);
    }
  }
}
