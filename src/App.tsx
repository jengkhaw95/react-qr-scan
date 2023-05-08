import React, { useState } from 'react'
import { QrReader } from '../packages'

function App() {
    const [disabled, setDisabled] = useState(true)

    return (
        <div className="App">
            <button
                onClick={() => {
                    setDisabled((p) => !p)
                }}
            >
                TURN {disabled ? 'ON' : 'OFF'}
            </button>
            <QrReader
                disabled={disabled}
                onResult={(result) => {
                    console.log(result)
                }}
            />
        </div>
    )
}

export default App
