export async function getAnime(params: any) {
  let url = `${process.env.VITE_SHIKI_URL}/api/animes`;

  if (params) {
    if (typeof params === 'string') {
      url += `/${params}`
    } else {
      url += '?'
      Object.entries(params).map(([key, value]) => {
        url += `${key}=${value}&`
      })
    }
  }

  const res = await fetch(url)
  const data = await res.json()

  return data
}