export enum WaysToSplit {
    Person1 = 1,
    Person2 = 2,
    All = 0
}

export type SplitBetween = keyof typeof WaysToSplit;
