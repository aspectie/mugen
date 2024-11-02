export function clearHTML(text: string): string {
  return text.replace(/<[^>]+>/g, '')
}
