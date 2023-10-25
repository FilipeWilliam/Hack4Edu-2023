import prismaClient from "@/prisma";

export class ListRankingService {
	async execute(subjectId?: string) {
		try {
			let result: any = [];

			if (subjectId !== undefined) {
				let allUserTasks = await prismaClient.userTasks.findMany({
					where: {
						task: {
							subjectId: +subjectId
						}
					},
				});	

				for (let item of allUserTasks) {
					let currentUser = result.find(i => i?.userId === item.userId);

					if (currentUser !== undefined) {
						currentUser.score += item.score;
					} else {
						result.push(item);
					}
				}
			} else {
				result = await prismaClient.userTasks.groupBy({
					by: ['userId'],
					_sum: {
						score: true,
					},
				});	
			}
	
			return { result };
		} catch (error) {
			console.log(error);
		}
	}
}