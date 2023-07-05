export enum WaysToSplit {
    Person1,
    Person2,
    All
}

export type WaysToSplitType = keyof typeof WaysToSplit;
// 'Person1' | 'Person2' | 'All'