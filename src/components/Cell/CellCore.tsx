'use client'
import React from 'react'
import styled from 'styled-components'

type CellCoreProps = {
    width: number
    height: number
    y: number
    x: number
    thickness: number
    fill: string
    stroke: string
    initDrag: (this: SVGRectElement, ev: MouseEvent) => void
}

export const CellCore = React.forwardRef<SVGRectElement, CellCoreProps>(function Cell(props, ref) {
    const { width, height,y, thickness = 4, fill = 'blue', stroke = 'black', initDrag } = props
    const topRectRef = React.useRef<SVGRectElement>(null)
    const rightRectRef = React.useRef<SVGRectElement>(null)
    const bottomRectRef = React.useRef<SVGRectElement>(null)
    const leftRectRef = React.useRef<SVGRectElement>(null)

    React.useEffect(() => {
        if (topRectRef.current && rightRectRef.current && bottomRectRef.current && leftRectRef.current) {
            topRectRef.current.addEventListener('mousedown', initDrag, false)
            rightRectRef.current.addEventListener('mousedown', initDrag, false)
            bottomRectRef.current.addEventListener('mousedown', initDrag, false)
            leftRectRef.current.addEventListener('mousedown', initDrag, false)
        }

        return () => {
            if (topRectRef.current && rightRectRef.current && bottomRectRef.current && leftRectRef.current) {
                topRectRef.current.removeEventListener('mousedown', initDrag, false)
                rightRectRef.current.removeEventListener('mousedown', initDrag, false)
                bottomRectRef.current.removeEventListener('mousedown', initDrag, false)
                leftRectRef.current.removeEventListener('mousedown', initDrag, false)
            }
        }

    }, [topRectRef, rightRectRef, bottomRectRef, leftRectRef])

    return (
        <g >
            <rect
                ref={ref}
                className={'rect-cell'}
                width={width}
                height={height}
                fill={fill}
                y={y}
                x={0}
            />
            <Rect
                side="top"
                active={stroke}
                ref={topRectRef}
                cursor={'row-resize'}
                className={'rect-border-top'}
                width={width}
                height={thickness}
                fill={fill}
                y={y}
                x={0}
            />
            <Rect
                side="right"
                active={stroke}
                ref={rightRectRef}
                cursor={'col-resize'}
                className={'rect-border-right'}
                width={thickness}
                height={height}
                fill={fill}
                y={y}
                x={width - thickness}
            />
            <Rect
                side="bottom"
                active={stroke}
                ref={bottomRectRef}
                cursor={'row-resize'}
                className={'rect-border-bottom'}
                width={width}
                height={thickness}
                fill={fill}
                y={height - thickness + y}
                x={0}
            />
            <Rect
                side="left"
                active={stroke}
                ref={leftRectRef}
                cursor={'col-resize'}
                className={'rect-border-left'}
                width={thickness}
                height={height}
                fill={fill}
                y={y}
                x={0}
            />
        </g>
    )
})

export type Sides = 'top' | 'right' | 'bottom' | 'left'
type RectProps = {
    fill: string
    active: string
    side: Sides
}
const Rect = styled.rect.attrs<RectProps>(props => ({
    fill: props.fill,
    active: props.active,
    side: props.side
}))`
    fill: ${({ fill }) => fill};
    &:hover {

        fill: ${({ active }) => active};
    }
`