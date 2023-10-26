import { Request, Response } from 'express';
import { GroupHitByLevelService } from './GroupHitByLevelService';
import { handleErrorDefault, handleResult } from '@/utils';

export class GroupHitByLevelController {
	async handle(req: Request, res: Response) {
		const { subjectId } = req.query;
    const service = new GroupHitByLevelService();

    try {
      const result = await service.execute(subjectId);

      return handleResult(res, result);
    } catch (err) {
      return handleErrorDefault(res, err);
    }
	}
}