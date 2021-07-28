import { NextApiRequest, NextApiResponse } from 'next';
import fauna from 'faunadb';

const { query } = fauna;
const client = new fauna.Client({ secret: process.env.FAUNA_API_KEY });

interface ImagesQueryResponse {
  after?: {
    id: string;
  };
  data: {
    data: {
      title: string;
      description: string;
      url: string;
    };
    ts: number;
    ref: {
      id: string;
    };
  }[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === 'POST') {
    const { url, title, description } = req.body;

    return client
      .query(
        query.Create(query.Collection('images'), {
          data: {
            title,
            description,
            url,
          },
        })
      )
      .then(() => {
        return res.status(201).json({ success: true });
      })
      .catch(err =>
        res
          .status(501)
          .json({ error: `Sorry something Happened! ${err.message}` })
      );
  }

  if (req.method === 'GET') {
    const { after } = req.query;

    const queryOptions = {
      size: 6,
      ...(after && { after: query.Ref(query.Collection('images'), after) }),
    };

    return client
      .query<ImagesQueryResponse>(
        query.Map(
          query.Paginate(
            query.Documents(query.Collection('images')),
            queryOptions
          ),
          query.Lambda('X', query.Get(query.Var('X')))
        )
      )
      .then(response => {
        const formattedData = response.data.map(item => ({
          ...item.data,
          ts: item.ts,
          id: item.ref.id,
        }));

        return res.json({
          data: formattedData,
          after: response.after ? response.after[0].id : null,
        });
      })
      .catch(err => {
        return res.status(400).json(err);
      });
  }

  return res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
}
