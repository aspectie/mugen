export function clearHTML(text: string): string {
  return text.replace(/<[^>]+>/g, '')
}

export type LooseObject = {
  [key: string]: any
}
