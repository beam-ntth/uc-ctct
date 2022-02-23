import React from 'react';

export default function Navbar() {
    return (
        <React.Fragment>
            <Navbar className="navbar">
                {/* Logo Side */}
                <div className="logo">
                    <div className="sub_logo">
                        <img src="/asset/images/uc-seal-blue.png" alt="UC Seal"/>
                    </div>
                </div>
            </Navbar>
            <style jsx>
                {`
                    .navbar {

                    }

                    .logo {

                    }

                    .sub_logo {

                    }
                `}
            </style>
        </React.Fragment>
    )
}
