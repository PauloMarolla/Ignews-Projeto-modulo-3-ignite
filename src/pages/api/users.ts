import { NextApiRequest, NextApiResponse } from 'next'

export default (request: NextApiRequest, response: NextApiResponse) => {
  const user = [
    {id: 1, name: 'paulo'},
    {id: 2, name: 'gui'},
    {id: 3, name: 'bel'},
  ]

  return response.json(user);
}