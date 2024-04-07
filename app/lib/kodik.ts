const kodikUrl = import.meta.env.VITE_KODIK_URL
const kodikToken = import.meta.env.VITE_KODIK_TOKEN

export async function getPlayerLink(id: string): Promise<string | undefined> {
  const response = await fetch(
    `${kodikUrl}/search?shikimori_id=${id}&token=${kodikToken}`
  )
  const data = await response.json()

  return data.results[0].link
}
