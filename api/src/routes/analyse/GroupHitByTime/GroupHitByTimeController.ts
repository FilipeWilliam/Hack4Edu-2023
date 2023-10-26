import { Request, Response } from 'express';
import { GroupHitByTimeService } from './GroupHitByTimeService';
import { handleErrorDefault, handleResult } from '@/utils';

export class GroupHitByTimeController {
	async handle(req: Request, res: Response) {
		const { subjectId, userId } = req.query;
    const service = new GroupHitByTimeService();

    try {
      const result = await service.execute(subjectId, userId);

      return handleResult(res, result);
    } catch (err) {
      return handleErrorDefault(res, err);
    }
	}
}