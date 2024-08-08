export enum WaysToSplit {
    All = 0,
    Person1 = 1,
    Person2 = 2,
}
export type WaysToSplitType = keyof typeof WaysToSplit;
export type SplitParties = Exclude<WaysToSplitType, 'All'>;
