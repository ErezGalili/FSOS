import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import Menorah from "../assets/menorah/menorah-shamash.svg"
import Menorah1 from "../assets/menorah/menorah-first-night.svg"
import Menorah2 from "../assets/menorah/menorah-second-night.svg"
import Menorah3 from "../assets/menorah/menorah-third-night.svg"
import Menorah4 from "../assets/menorah/menorah-fourth-night.svg"
import Menorah5 from "../assets/menorah/menorah-fifth-night.svg"
import Menorah6 from "../assets/menorah/menorah-sixth-night.svg"
import Menorah7 from "../assets/menorah/menorah-seventh-night.svg"
import Menorah8 from "../assets/menorah/menorah-eighth-night.svg"

const menorahs = [Menorah, Menorah1, Menorah2, Menorah3, Menorah4, Menorah5, Menorah6, Menorah7, Menorah8]

function MenorahHandler() {
    const [night, setNight] = useState(0)
    const [text, setText] = useState('')
    useEffect(() => {
        setText('')
    }, [night])
    return (
        <>
            <div>
                <button onClick={() => setNight(night => Math.min(night + 1, 8))}>next</button>
                <img src={menorahs[night]} alt={`menorah night: ${night}`} />
                <button onClick={() => setNight(night => Math.max(night - 1, 0))}>prev</button>
            </div>
        </>
    )}

const TheMenorah = () => {
    const [night, setNight] = useState(0)

    const alt = menorahs[night] ? `menorah night: ${night}` : `Empty menorah: ${Menorah}`

    const increase = () => setNight(night => Math.min(night + 1, 8))
    const decrease = () => setNight(night => Math.max(night - 1, 0))

    return (
        <>
            <div>
                <NavLink to="/Home">Home</NavLink>
                <NavLink to="/Gallery">Gallery</NavLink>
            </div>
            <div className="menorah">
                <button onClick={decrease}>prev</button>
                <img src={menorahs[night] || Menorah} alt={alt} />
                <button onClick={increase}>next</button>
            </div>
        </>
    )
}

export default TheMenorah


