'use client'
import React from 'react'

export type RefType = React.MutableRefObject<HTMLElement | SVGElement | null>
export type GetBoundingClientRectType = {
    x: number
    y: number
    width: number
    height: number
    top: number
    right: number
    bottom: number
    left: number
}

export function useDimensions(): [RefType, GetBoundingClientRectType] {
    const ref = React.useRef<HTMLElement | SVGElement>(null)
    const [dimensions, setDimensions] = React.useState<GetBoundingClientRectType>({})

    React.useLayoutEffect(() => {
        if (ref.current) {
            setDimensions(ref.current.getBoundingClientRect().toJSON())
        }
    }, [ref.current])

    return [ref, dimensions]
}