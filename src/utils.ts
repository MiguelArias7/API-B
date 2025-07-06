export function parseValtoInt(val: unknown): number {

    if (typeof val === 'number') {
        return val;
    }
    if (typeof val === 'string') {
        const parsed = parseInt(val, 10);
        return isNaN(parsed) ? 0 : parsed;
    }
    if (typeof val === 'boolean') {
        return val ? 1 : 0;
    }
    if (val === null || val === undefined) {
        return 0;
    }
    if (Array.isArray(val)) {
        return val.length;
    }

    throw new Error(`Cannot parse value of type ${typeof val} to an integer.`);
}

export function parseValtoString(val: unknown): string {
    if (typeof val === 'string') {
        return val;
    }
    if (typeof val === 'number') {
        return val.toString();
    }
    if (typeof val === 'boolean') {
        return val ? 'true' : 'false';
    }
    if (val === null || val === undefined) {
        return '';
    }
    if (Array.isArray(val)) {
        return val.join(', ');
    }

    throw new Error(`Cannot parse value of type ${typeof val} to a string.`);
}