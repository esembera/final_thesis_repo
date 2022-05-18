import { memo } from 'react'
import { Box } from './Box.js'
import { Dustbin } from './Dustbin.js'


export const Container = memo(function Container() {
  return (
    <div>
      <div style={{ overflow: 'hidden', clear: 'both' }}>
        <Dustbin style={{margin: "0 auto"}}/>
      </div>
      <div style={{ overflow: 'hidden', clear: 'both' }}>
        <Box name=">" />
        <Box name="<" />
        <Box name="=" />
      </div>
    </div>
  )
})