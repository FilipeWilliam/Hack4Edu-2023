import { Response, Request } from 'express';
import { handleErrorDefault, handleResult } from '../../../utils';
import { CreateGptQuestionService } from './CreateGptQuestionService';

export class CreateGptQuestionController {
  async handle(req: Request, res: Response) {
    const { questions } = req.body;
    const service = new CreateGptQuestionService();

    try {
      const result = await service.execute(questions);

      return handleResult(res, result);
    } catch (err) {
      return handleErrorDefault(res, err);
    }
  }
}