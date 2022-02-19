import React from 'react'
import Link from 'next/link'

function CoffeeStore(props) {
    return (
        <div>
            <h2>Coffee Store</h2>
            <Link href="/"><a>Return Home</a></Link>
        </div>
    )
}

export default CoffeeStore