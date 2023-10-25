import { UserTypes } from "../../../enums";
import prismaClient from "@/prisma";
import { CreateQuestionService } from "@/routes/questions/create/CreateQuestionService";
import { CreateUserTaskService } from "@/routes/userTasks/create/CreateUserTaskService";

export class CreateTaskService {
  async execute(periodStart: string, periodEnd: string, subjectId: number, questions?: Array<any>) {
    try {
      let result = await prismaClient.tasks.create({
        data: {
          periodStart: new Date(periodStart + ' 00:00:00'),
          periodEnd: new Date(periodEnd + ' 23:59:59'),
          subjectId
        }
      });

      let allCurrentSubjectStudents = await prismaClient.userSubjects.findMany({
        where: {
          subjectId,
          user: {
            type: UserTypes.Student
          },
        },
        select: {
          userId: true,
        }
      });
      
      if (allCurrentSubjectStudents.length > 0) {
        let userTaksService = new CreateUserTaskService();

        for (let userSubject of allCurrentSubjectStudents) {
          await userTaksService.execute(result.id, userSubject.userId);
        }
      }

      if (questions !== undefined) {
        await this.registerTaskQuestions(questions, result.id);
      }

      return { result };
    } catch (error) {
      console.log(error);
    }
  }

  private async registerTaskQuestions(questions: Array<any>, taskId: number) {
    let createQuestionService = new CreateQuestionService();

    for (let question of questions) {
      await createQuestionService.execute(question.title, question.alternative1, question.alternative2, question.alternative3, question.alternative4, taskId, question.correctAlternative, question.level);
    }
  }
}
