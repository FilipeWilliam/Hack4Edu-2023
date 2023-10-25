import prismaClient from "@/prisma";

export class ReadSubjectsService {
  async execute(id: number) {
    try {
      let result = await prismaClient.subjects.findFirst({
        where: {
          id,
        },
      });

      return { result };
    } catch (error) {
      console.log(error);
    }
  }
}
