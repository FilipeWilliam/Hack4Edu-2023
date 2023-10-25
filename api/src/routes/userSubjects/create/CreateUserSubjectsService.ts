import { UserTypes } from "@/enums";
import prismaClient from "@/prisma";
import { CreateUserTaskService } from "@/routes/userTasks/create/CreateUserTaskService";

export class CreateUserSubjectService {
  async execute(userId: number, subjectId: number) {
    try {
      let result = await prismaClient.userSubjects.create({
        data: {
          userId,
          subjectId
        },
        include: {
          user: true 
        }
      });

      if (result.user.type === UserTypes.Student) {
        this.assignPendingTasksToNewStudent(subjectId, userId);
      }

      return { result };
    } catch (error) {
      console.log(error);
    }
  }

  async assignPendingTasksToNewStudent(subjectId: number, userId: number) {
    let pendingTasks = await prismaClient.tasks.findMany({
      where: {
        subjectId,
        periodEnd: {
          gt: new Date()
        }
      }
    });

    if (pendingTasks.length > 0) {
      let createUserTaksService = new CreateUserTaskService();

      for (let task of pendingTasks) {
        await createUserTaksService.execute(task.id, userId);
      }
    }

  }
}
