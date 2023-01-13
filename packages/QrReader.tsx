import { useEffect, useId, useRef } from 'react'
import { BrowserQRCodeReader, IScannerControls } from '@zxing/browser'
import type { Result } from '@zxing/library'

interface QrReaderProps {
    className?: string
    disabled?: boolean
    scanDelay?: number
    onResult?: (result?: Result, error?: Error) => void,
    mediaTrackConstraints?: MediaTrackConstraints
}

export default function QrReader({
    className = '',
    disabled = false,
    scanDelay = 500,
    onResult = () => { },
    mediaTrackConstraints = {
        facingMode: {
            ideal: "environment"
        }
    }
}: QrReaderProps) {
    const videoId = useId()

    const controlRef = useRef<IScannerControls | null>(null)
    const readerRef = useRef<BrowserQRCodeReader | null>(null)

    useEffect(() => {
        readerRef.current = new BrowserQRCodeReader(undefined, {
            delayBetweenScanAttempts: scanDelay,
        })

        return () => {
            controlRef.current?.stop()
        }
    }, [])

    useEffect(() => {
        if (!disabled) {
            readerRef.current
                ?.decodeFromConstraints(
                    {
                        video: mediaTrackConstraints,
                    },
                    videoId,
                    (result, error) => {
                        onResult(result, error)
                    }
                )
                .then(
                    (controls: IScannerControls) =>
                        (controlRef.current = controls)
                )
                .catch((error: Error) => {
                    console.warn(error)
                })
        } else {
            controlRef.current?.stop()
        }
    }, [disabled])

    return (
        <section className={className}>
            <video id={videoId}></video>
        </section>
    )
}
