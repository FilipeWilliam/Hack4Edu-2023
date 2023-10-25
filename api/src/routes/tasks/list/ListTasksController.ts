import { Response, Request } from 'express';
import { handleErrorDefault, handleResult } from '../../../utils';
import { ListTasksService } from './ListTasksService';

export class ListTasksController {
  async handle(req: Request, res: Response) {
    const {subjectId} = req.currentUser;
    const service = new ListTasksService();

    try {
      const result = await service.execute(subjectId);

      return handleResult(res, result);
    } catch (err) {
      return handleErrorDefault(res, err);
    }
  }
}