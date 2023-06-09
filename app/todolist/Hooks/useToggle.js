import { useState } from "react"

export const useToggle = () => {
    const [state,toggleState] = useState(false)
    const toggle = () => {
        toggleState(!state)
    }
    return [state,toggle]
}