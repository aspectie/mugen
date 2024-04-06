// import { TAnime } from '@/types/api/anime'
// import { TMyAnimeListAnime } from '@/types/api/myAnimeList/anime'

// export function myAnimeListApi() {
//   return {
//     getAnime
//   }
// }

// function unwrapResponseNodes(data: Array<{ node: TMyAnimeListAnime }>) {
//   return data.map((item) => item.node)
// }

// function castToAnime(data: TMyAnimeListAnime[]): TAnime[] {
//   return data.map((item) => {
//     return {
//       id: item.id,
//       title: item.title,
//       type: item.media_type,
//       image: item.main_picture.large,
//       released: item.start_date
//     }
//   })
// }

// async function getAnime(params: string | Record<string, string | number>) {
//   let url = `${process.env.MY_ANIME_LIST_API_URL}/anime`

//   if (params) {
//     if (typeof params === 'string') {
//       url += `/${params}`
//     } else {
//       url += '?'
//       Object.entries(params).map(([key, value]) => {
//         url += `${key}=${value}&`
//       })
//     }
//   }

//   if (!process.env.MY_ANIME_LIST_CLIENT_ID) {
//     return
//   }

//   const res = await fetch(url, {
//     method: 'GET',
//     headers: {
//       'X-MAL-CLIENT-ID': process.env.MY_ANIME_LIST_CLIENT_ID
//     }
//   })

//   if (res.ok) {
//     let { data } = await res.json()

//     return castToAnime(unwrapResponseNodes(data))
//   }
//   return null
// }
