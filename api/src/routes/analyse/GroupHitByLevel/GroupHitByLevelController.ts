import { Request, Response } from 'express';
import { GroupHitByLevelService } from './GroupHitByLevelService';
import { handleErrorDefault, handleResult } from '@/utils';

export class GroupHitByLevelController {
	async handle(req: Request, res: Response) {
		const { subjectId, userId } = req.query;
    const service = new GroupHitByLevelService();

    try {
      const result = await service.execute(subjectId, userId);

      return handleResult(res, result);
    } catch (err) {
      return handleErrorDefault(res, err);
    }
	}
}