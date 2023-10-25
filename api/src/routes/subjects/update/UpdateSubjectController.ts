import { Response, Request } from 'express';
import { handleErrorDefault, handleResult } from '../../../utils';
import { UpdateSubjectService } from './UpdateSubjectService';

export class UpdateSubjectController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { name, color, icon } = req.body;
    const service = new UpdateSubjectService();

    try {
      const result = await service.execute(+id, name, color, icon);

      return handleResult(res, result);
    } catch (err) {
      return handleErrorDefault(res, err);
    }
  }
}