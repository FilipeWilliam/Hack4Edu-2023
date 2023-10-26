import { Request, Response } from 'express';
import { GroupFocusOutByHitService } from './GroupFocusOutByHitService';
import { handleErrorDefault, handleResult } from '@/utils';

export class GroupFocusOutByHitController {
	async handle(req: Request, res: Response) {
		const { subjectId, userId } = req.query;
    const service = new GroupFocusOutByHitService();

    try {
      const result = await service.execute(subjectId, userId);

      return handleResult(res, result);
    } catch (err) {
      return handleErrorDefault(res, err);
    }
	}
}