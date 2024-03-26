export function clearHTML(text : string) {
    return text.replace(/<[^>]+>/g, '');
}