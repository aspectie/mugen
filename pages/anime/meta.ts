import { type MetaFunction } from '@remix-run/node'

import { loader } from './.server/loader'

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    {
      title: `${
        data && data.rawData ? data.rawData.title.ru : 'Anime page'
      } - Аниме`
    },
    { name: 'description', content: 'The best anime project' }
  ]
}
