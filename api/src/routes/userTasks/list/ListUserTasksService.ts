import prismaClient from "@/prisma";

export class ListUserTasksService {
  async execute(userId: number) {
    try {
      let result = await prismaClient.userTasks.findMany({
        where: {
          userId,
        },
        select: {
          id: true,
          status: true,
          task: {
            select: {
              id: true,
              subject: {
                select: {
                  name: true,
                  icon: true,
                  color: true
                }
              },
              periodEnd: true,
              periodStart: true,
            }
          }
        }
      });

      let total = await prismaClient.userTasks.count({
        where: {
          userId
        }
      })

      return { result, total };
    } catch (error) {
      console.log(error);
    }
  }
}
