import { useEffect, useRef, useState } from "react"

const useDebouncedThrottledValue = (value, debounceMs = 300, throttleMs = 500) => {
    const [throttledValue, setThrottledValue] = useState(value)
    const lastUpdateTime = useRef(0)

    useEffect(() => {
        let throttleTimer
        const debounceTimer = setTimeout(() => {
            const remainingTime = throttleMs - (Date.now() - lastUpdateTime.current)
            const applyValue = () => {
                lastUpdateTime.current = Date.now()
                setThrottledValue(value)
            }

            if (remainingTime <= 0) applyValue()
            else throttleTimer = setTimeout(applyValue, remainingTime)
        }, debounceMs)

        return () => {
            clearTimeout(debounceTimer)
            clearTimeout(throttleTimer)
        }
    }, [value, debounceMs, throttleMs])

    return throttledValue
}

export default useDebouncedThrottledValue
