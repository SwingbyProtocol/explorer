import Cors from 'cors';
import type { NextApiRequest, NextApiResponse } from 'next';

export const getParam = ({ req, name }: { req: NextApiRequest; name: string }): string => {
  if (typeof req.query[name] !== 'string') {
    throw new Error(`"${name}" must be a string`);
  }

  return req.query[name] as string;
};

const defaultCors = Cors();

export const corsMiddleware = ({
  req,
  res,
  cors = defaultCors,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
  cors?: typeof defaultCors;
}) => {
  return new Promise((resolve, reject) => {
    cors(req as any, res as any, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
};
