import React, { useState } from 'react'
import { QrReader } from '../dist/esm/index'
// import { QrReader } from '../packages'
// import {QrReader} from "@jengkhaw95/react-qr-scan"

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
