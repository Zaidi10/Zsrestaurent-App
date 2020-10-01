import React from 'react'
import Loader from 'react-loader-spinner'



export const Loading = () => {
    return (
        <div className="col-12 loader-container">
            <Loader
                type="Oval"
                color="#171a29"
                secondaryColor="#9575CD"
                height={50}
                width={50}


            />

        </div>
    )
}
