import React from 'react';

const NavBar = ({ setSelectedView }) => {
    return (
        <div>
            <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand">Civic-Alert</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <button className="nav-link active" onClick={() => setSelectedView('all')}>All</button>
                            <button className="nav-link active" onClick={() => setSelectedView('traffic')}>Traffic</button>
                            <button className="nav-link active" onClick={() => setSelectedView('animal')}>Animal Attack</button>
                            <button className="nav-link active" onClick={() => setSelectedView('construction')}>Construction</button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
