export function getIndefiniteArticle(value: string) {
    return /^[aeiou]/i.test(value) ? 'an' : 'a'
}
