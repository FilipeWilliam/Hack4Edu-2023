import { Request, Response } from 'express';
import { GroupAnalyseByLevelService } from './GroupAnalyseByLevelService';
import { handleErrorDefault, handleResult } from '@/utils';

export class GroupAnalyseByLevelController {
	async handle(req: Request, res: Response) {
		const { subjectId } = req.query;
    const service = new GroupAnalyseByLevelService();

    try {
      const result = await service.execute(subjectId);

      return handleResult(res, result);
    } catch (err) {
      return handleErrorDefault(res, err);
    }
	}
}