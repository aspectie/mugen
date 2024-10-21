import { json, LoaderFunctionArgs } from '@remix-run/node'
import invariant from 'tiny-invariant'
import { getAnimeData } from 'shared/.server'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.id, 'Expected params.id')

  const data = await getAnimeData(params.id)

  if (!data) {
    throw new Response('Not Found', { status: 404 })
  }

  return json(data)
}
