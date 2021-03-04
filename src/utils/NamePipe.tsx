import { isNil } from 'lodash';

export const NamePipe = (value: { middle: string, first: string, last: string }): string => {
    let middle = '';
    let first = '';
    let last = '';
    if (!isNil(value)) {
        middle = value.middle || '';
        first = value.first || '';
        last = value.last || '';

        return `${last}, ${first} ${middle}`;
    }

    return '';
}
