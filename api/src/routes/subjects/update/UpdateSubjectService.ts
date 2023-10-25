import prismaClient from "../../../prisma";

export class UpdateSubjectService {
  async execute(id: number, name: string, color: string, icon: string) {
    try {
      let result = await prismaClient.subjects.update({
        where: {
          id
        },
        data: {
          name,
          color,
          icon
        }
      });

      return { result };
    } catch (error) {
      console.log(error);
    }
  }
}
