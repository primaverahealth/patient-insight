export const toTitleCase = (s: string): string => {
    if (s.length > 0) {
        const words = s.split(' ')
        if (Array.isArray(words) && words.length > 0) {
            if (words.length === 1) {
                const word = words[0]
                const matches = word.charAt(0).match(/\w+/i)
                const lines = word.split('\n')
                if (Array.isArray(lines) && lines.length > 1) {
                    return lines.map(line => {
                        return toTitleCase(line)
                    }).join('\n')
                } else if (Array.isArray(matches)) {
                    return word.split('').map((c, i) => {
                        if (i === 0) {
                            return c.toUpperCase()
                        }
                        return c.toLowerCase()
                    }).join('')
                } else {
                    return word.charAt(0).concat(toTitleCase(word.slice(1)))
                }
            } else {
                return words.map(word => toTitleCase(word)).join(' ')
            }
        }
    }
    return ''
}
