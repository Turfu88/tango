
export interface Tile {
    id: number
    value: number
    isDisabled: boolean
    isError: boolean
    verticalConstraint: string | null 
    horizontalConstraint: string | null
    isResolved?: boolean
    canHaveVerticalConstraintEqual?: boolean
    canHaveVerticalConstraintReversed?: boolean
    canHaveHorizontalConstraintEqual?: boolean
    canHaveHorizontalConstraintReversed?: boolean
}
