/** Zero-based index to a padded position label: 0 → "01", 9 → "10". */
export function toSequenceLabel(index: number, digits = 2) {
    return String(index + 1).padStart(digits, '0')
}
