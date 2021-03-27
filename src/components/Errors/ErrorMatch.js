import React from 'react'
import { ErrorContainer, Dots, Dot, OhNo } from './styled'

function Error() {
  return (
    <ErrorContainer>
      <Dots>
        <Dot></Dot>
        <Dot></Dot>
        <Dot></Dot>
      </Dots>
      <OhNo>Oh no! No matches, how about you spray some cologne?</OhNo>
    </ErrorContainer>

  )

}

export default Error;