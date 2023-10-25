import { Request, Response } from 'express';
import { ListRankingService } from './ListRankingService';
import { handleErrorDefault, handleResult } from '@/utils';

export class ListRankingController {
	async handle(req: Request, res: Response) {
		const { subjectId } = req.query;
    const service = new ListRankingService();

    try {
      const result = await service.execute(subjectId);

      return handleResult(res, result);
    } catch (err) {
      return handleErrorDefault(res, err);
    }
	}
}