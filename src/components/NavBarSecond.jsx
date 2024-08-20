import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavBarSecond = () => {
    const navigate = useNavigate();
    
    const LogOut = () => {
        sessionStorage.clear();
        navigate("/");
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Alert App</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <a className="nav-link active" href="/addalerts">  Add Alerts  </a>
                            <a className="nav-link active" href="/addgeofences">  Add Geofencing </a>
                            <button className="btn btn-danger" onClick={LogOut}>  Log Out  </button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NavBarSecond;
