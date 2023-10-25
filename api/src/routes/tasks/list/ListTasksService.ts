import prismaClient from "@/prisma";

export class ListTasksService {
  async execute(subjectId: number) {
    try {
      let result = await prismaClient.tasks.findMany({
        where: {
          subjectId,
        },
        include: {
          subject: true
        }
      });

      let total = await prismaClient.tasks.count({
        where: {
          subjectId,
        },
      })

      return { result, total };
    } catch (error) {
      console.log(error);
    }
  }
}
