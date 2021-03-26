import { NextApiRequest, NextApiResponse } from 'next'

export default (request: NextApiRequest, response: NextApiResponse) => {
  console.log(request.query);
  const user = [
    {id: 1, name: 'paulo'},
    {id: 2, name: 'gui'},
    {id: 3, name: 'bel'},
  ]

  return response.json(request.query);
}