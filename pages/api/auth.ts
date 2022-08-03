import type { NextApiRequest, NextApiResponse } from 'next'
import { IUser } from '../../types';
import { client } from '../../utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const user: IUser = req.body;
        client.createIfNotExists(user)
            .then(() =>
                res.status(200).json('Login success')
            ).catch(() =>
                res.status(200).json('Login Failed')
            )
    }

}
