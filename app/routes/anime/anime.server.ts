export async function getAnime(id?: string) {
  const url = id ? `${process.env.SHIKI_URL}/api/animes/${id}` : `${process.env.SHIKI_URL}/api/animes`
  const res = await fetch(url)
  const data = await res.json()

  return data
}