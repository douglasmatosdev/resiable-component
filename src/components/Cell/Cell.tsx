'use client'
import React from 'react'
import { CellCore } from './CellCore'
import { useDimensions } from '@/hooks/useDimensions'

export const Cell = (): JSX.Element => {
    const [ref, { width, height }] = useDimensions()

    const svgRef = React.useRef(null)
    const cellRef = React.useRef<SVGRectElement>(null)
    const [updatedDimensions, setUpdatedDimensions] = React.useState<{ width: number; height: number; y: number }>({
        // x: 0,
        y: 0,
        width: 100,
        height: 100
    })
    const dimensions = React.useRef({
        side: '',
        x: 0,
        y: 0,
        width: 100,
        height: 100
    })

    const initDrag = React.useCallback((e: MouseEvent) => {

        dimensions.current.side = (e.target as SVGRectElement).getAttribute('side') || ''
        dimensions.current.x = e.clientX;
        dimensions.current.y = e.clientY;

        if (document.defaultView && cellRef.current) {
            dimensions.current.width = parseInt(document.defaultView.getComputedStyle(cellRef.current).width, 10);
            dimensions.current.height = parseInt(document.defaultView.getComputedStyle(cellRef.current).height, 10);
        }

        document.documentElement.addEventListener('mousemove', doDrag, false);
        document.documentElement.addEventListener('mouseup', stopDrag, false);
    }, [cellRef.current])

    const doDrag = React.useCallback((e: MouseEvent) => {
        const { side, x, y, width, height } = dimensions.current

        if (cellRef.current) {
            let udpatedWidth = (width + e.clientX - x)
            let updatedHeight = dimensions.current.height
            let updatedY = dimensions.current.y
            cellRef.current.setAttribute('width', udpatedWidth + 'px')
            if (side == 'top' || side == 'bottom') {
                
                if (side == 'top') {
                    updatedHeight = (height - e.clientY + y) > 16 ? (height - e.clientY + y) : 16
                    updatedY = height - updatedHeight
                    cellRef.current.setAttribute('y', `${updatedY}px`)
                    cellRef.current.setAttribute('height', updatedHeight + 'px')
                } else if ('bottom') {
                    updatedY = 0
                    updatedHeight = (height + e.clientY - y) > 16 ? (height + e.clientY - y) : 16
                    cellRef.current.setAttribute('y', `0px`)
                    cellRef.current.setAttribute('height', updatedHeight + 'px')
                }

                setUpdatedDimensions({
                    ...updatedDimensions,
                    y: updatedY,
                    height: updatedHeight
                })
            }

            setUpdatedDimensions({
                y: updatedY,
                width: udpatedWidth,
                height: updatedHeight
            })
        }

    }, [cellRef.current])

    function stopDrag(e: MouseEvent) {
        document.documentElement.removeEventListener('mousemove', doDrag, false);
        document.documentElement.removeEventListener('mouseup', stopDrag, false);
    }

    return (
        <div ref={ref}>
            <svg ref={svgRef} width={width} height={height}>
                <CellCore
                    ref={cellRef}
                    initDrag={initDrag}
                    y={updatedDimensions.y}
                    // x={updatedDimensions.x}
                    width={updatedDimensions.width}
                    height={updatedDimensions.height}
                    thickness={3}
                    fill='yellow'
                    stroke='red'
                />
            </svg>
        </div>
    )
}

