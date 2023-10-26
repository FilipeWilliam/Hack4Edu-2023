import { Request, Response } from 'express';
import { GroupTimeByLevelService } from './GroupTimeByLevelService';
import { handleErrorDefault, handleResult } from '@/utils';

export class GroupTimeByLevelController {
	async handle(req: Request, res: Response) {
		const { subjectId } = req.query;
    const service = new GroupTimeByLevelService();

    try {
      const result = await service.execute(subjectId);

      return handleResult(res, result);
    } catch (err) {
      return handleErrorDefault(res, err);
    }
	}
}