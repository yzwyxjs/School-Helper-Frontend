export class ArrayUtils {
    public static groupBy(list: any[], fn: Function) {
        const groups = {};
        list.forEach(function (o) {
            const attr = JSON.stringify(fn(o))
            // @ts-ignore
            if(groups[attr] == null) {
                // @ts-ignore
                groups[attr] = []
            }
            // @ts-ignore
            groups[attr].push(o);
        })
        return groups;
    }
}