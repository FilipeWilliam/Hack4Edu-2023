import { Response, Request } from 'express';
import { handleErrorDefault, handleResult } from '../../../utils';
import { ListUserTasksService } from './ListUserTasksService';

export class ListUserTasksController {
  async handle(req: Request, res: Response) {
    const {userId, subjectId} = req.query;
    const service = new ListUserTasksService();

    try {
      const result = await service.execute(userId, subjectId);

      return handleResult(res, result);
    } catch (err) {
      return handleErrorDefault(res, err);
    }
  }
}