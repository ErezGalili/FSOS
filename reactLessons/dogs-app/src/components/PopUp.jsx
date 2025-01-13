import React, { useState } from 'react'

const PopUp = (props) => {
  const [show, setShow] = useState(false)

    return (
        <>
            <button style={{ position: 'relative' }} onClick={() => setShow(!show)}>Open</button>
            <div className='popup-menu' style={{ position: 'absolute', display: show ? 'block' : 'none' }}>
                <div className='inner-popup'>{props.children}
                    <button onClick={() => setShow(!show)}>Close</button>
                </div>
            </div>
        </>
  )
}

export default PopUp
