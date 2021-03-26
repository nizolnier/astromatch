import React from 'react'
import {ErrorContainer, Dots, Dot, OhNo} from './styled'

function Error() {
    return (
        <ErrorContainer>
            <Dots>
                <Dot></Dot>
                <Dot></Dot>
                <Dot></Dot>
            </Dots>
            <OhNo>Whops! You've already seen all the profiles!</OhNo>            
        </ErrorContainer>
    )

}

export default Error;