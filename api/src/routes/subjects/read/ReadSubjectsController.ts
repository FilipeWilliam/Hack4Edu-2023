import { Response, Request } from 'express';
import { handleErrorDefault, handleResult } from '../../../utils';
import { ReadSubjectsService } from './ReadSubjectsService';

export class ReadSubjectsController {
  async handle(req: Request, res: Response) {
    const {id} = req.params;
    const service = new ReadSubjectsService();

    try {
      const result = await service.execute(+id);

      return handleResult(res, result);
    } catch (err) {
      return handleErrorDefault(res, err);
    }
  }
}