import React, { useState, Children, createRef } from 'react'
import { NavLink } from 'react-router-dom'
import './css/sandbox.css'
import PopUp from './PopUp'
import Header from './header'
import Sidebar from './sidebar'

function Container(props) {
    return (
        <div>
            <h1>{props.children}</h1>
        </div>
    )
}

function Window(props) {
    const [show, setShow] = useState(true)
    return (show &&
        <div className='window'>
            <div className='innerWindow'>{props.children}
                <button onClick={() => setShow(!show)}>Close</button>
            </div>
        </div>
    )
}

function Displayer({ children }) {
    const [index, setIndex] = useState(0);

    const childrenArray = Children.toArray(children);

    const handleKeyDown = (event) => {
        switch (event.key) {
            case 'ArrowUp':
                setIndex((index + 1) % childrenArray.length);
                break;
            case 'ArrowDown':
                setIndex((index - 1 + childrenArray.length) % childrenArray.length);
                break;
        }
    }

    return (
        <div className='displayer'>
            {childrenArray[index]}
            <br />
            <input
                type="number"
                value={index}
                onChange={e => setIndex(parseInt(e.target.value, 10) % childrenArray.length)}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
}

const Sandbox = () => {
    return (<>
        <Container>
        <PopUp>
            <h1>Sandbox</h1>
            <p>This is a sandbox component.</p>
            <p>Test</p>
        </PopUp>
        <Header />
        <PopUp/>
        </Container>
        </>
    )
}

export default Sandbox
