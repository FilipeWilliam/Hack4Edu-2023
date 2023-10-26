import { Request, Response } from 'express';
import { GroupHitByTimeService } from './GroupHitByTimeService';
import { handleErrorDefault, handleResult } from '@/utils';

export class GroupHitByTimeController {
	async handle(req: Request, res: Response) {
		const { subjectId } = req.query;
    const service = new GroupHitByTimeService();

    try {
      const result = await service.execute(subjectId);

      return handleResult(res, result);
    } catch (err) {
      return handleErrorDefault(res, err);
    }
	}
}