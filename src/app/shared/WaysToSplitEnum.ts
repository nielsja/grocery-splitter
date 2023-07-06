export enum WaysToSplit {
    Person1 = 1,
    Person2 = 2,
    All = 0
}

export type WaysToSplitType = keyof typeof WaysToSplit;
// 'Person1' | 'Person2' | 'All'

export function getSplitNumber(way: WaysToSplitType) {

}