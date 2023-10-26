import prismaClient from "@/prisma";
import { GroupFocusOutByHitService } from "@/routes/analyse/GroupFocusOutByHit/GroupFocusOutByHitService";
import { GroupHitByLevelService } from "@/routes/analyse/GroupHitByLevel/GroupHitByLevelService";
import { GroupHitByTimeService } from "@/routes/analyse/GroupHitByTime/GroupHitByTimeService";
import { GroupTimeByLevelService } from "@/routes/analyse/GroupTimeByLevel/GroupTimeByLevelService";

export class ListUserTasksService {
  async execute(userId?: string, subjectId?: string) {
    try {
      if (userId !== undefined) {
        return this.listByUser(+userId);
      }

      return this.listBySubject(+subjectId);
    } catch (error) {
      console.log(error);
    }
  }

  private async listBySubject(subjectId: number) {
    let allUserTasks = await prismaClient.userTasks.findMany({
      where: {
        task: {
          subjectId
        }
      },
      include: {
        task: {
          include: {
            subject: true
          }
        },
        user: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    let total = await prismaClient.userTasks.count({
      where: {
        task: {
          subjectId
        }
      }
    });

    for (let userTask of allUserTasks) {
      let focusByHitService = new GroupFocusOutByHitService();
      let hitByLevel = new GroupHitByLevelService();
      let hitByTime = new GroupHitByTimeService();
      let timeByLevel = new GroupTimeByLevelService();

      (userTask as any).focusOut = (await focusByHitService.execute(subjectId, userTask.userId)).focusOut;
      (userTask as any).hitByLevel = await hitByLevel.execute(subjectId, userTask.userId);
      (userTask as any).hitByTime = await hitByTime.execute(subjectId, userTask.userId);
      (userTask as any).timeByLevel = await timeByLevel.execute(subjectId, userTask.userId);
    }

    let focusByHitService = new GroupFocusOutByHitService();
    let hitByLevel = new GroupHitByLevelService();
    let hitByTime = new GroupHitByTimeService();
    let timeByLevel = new GroupTimeByLevelService();
  
    let analyse = {
      focusOut: (await focusByHitService.execute(subjectId)).focusOut,
      hitByLevel: await hitByLevel.execute(subjectId),
      hitByTime: await hitByTime.execute(subjectId),
      timeByLevel: await timeByLevel.execute(subjectId)
    }

    return { result: allUserTasks, total, analyse };
  }

  private async listByUser(userId: number) {
    let result = await prismaClient.userTasks.findMany({
      where: {
        userId: userId,
      },
      include: {
        task: {
          include: {
            subject: true
          }
        },
        user: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    let total = await prismaClient.userTasks.count({
      where: {
        userId: userId,
      }
    });

    return { result, total };
  }
}
