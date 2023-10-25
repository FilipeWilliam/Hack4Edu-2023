import { Request, Response } from 'express';
import { ListGptQuestionsService } from './ListGptQuestionsService';
import { handleErrorDefault, handleResult } from '@/utils';

export class ListGptQuestionsController {
	async handle(req: Request, res: Response) {
		const { theme } = req.query;
    const service = new ListGptQuestionsService();

    try {
      const result = await service.execute(theme);

      return handleResult(res, result);
    } catch (err) {
      return handleErrorDefault(res, err);
    }
	}
}