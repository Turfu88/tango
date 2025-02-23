export interface VirtualMove {
    tileId: number;
    value: number;
    dimension: 'h' | 'v';
    methodUsed: string;
    methodComplexity: string;
}
