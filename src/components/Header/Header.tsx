'use client'
import React, { Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image'
import logo from '@/assets/contacts.png'
// import { Container } from './styles';

interface IHeader {
    setModalLogin: Dispatch<SetStateAction<boolean>>
    setModalRegister: Dispatch<SetStateAction<boolean>>
}

const Header: React.FC<IHeader> = ({ setModalLogin,setModalRegister }) => {

    const [menuIsOpen, setMenuIsOpen] = useState(false)
    const toogleMobileMenu = () => {
        setMenuIsOpen(!menuIsOpen)
    }
    return <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
        <main className='container'>
            <div className="navbar-brand is-dark">
                <a className="navbar-item" href="/">
                    <Image src={logo} alt="logo" height="28" />
                </a>

                <a role="button" onClick={() => {
                    toogleMobileMenu();
                }} className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navigation" className={`navbar-menu ${menuIsOpen ? "is-active" : ""}`}>
                <div className=" navbar-start">
                    <a className="navbar-item" href=''>
                        Documentation API
                    </a>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <button onClick={() => {
                                setModalRegister(true);
                            }}  className="button is-primary">
                                <strong>Sign up</strong>
                            </button>
                            <button onClick={() => {
                                setModalLogin(true);
                            }} className="button is-light">
                                Log in
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </nav>;
}

export default Header;