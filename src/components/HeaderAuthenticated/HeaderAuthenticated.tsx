'use client'
import React, { Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image'
import logo from '@/assets/contacts.png'
import { useRouter } from 'next/navigation';
// import { Container } from './styles';
interface IHeader {
    setModalRegisterContact: Dispatch<SetStateAction<boolean>>

}

const HeaderAuthenticated = ({setModalRegisterContact}:IHeader) => {
    const {push} = useRouter();
    const [menuIsOpen, setMenuIsOpen] = useState(false)
    const toogleMobileMenu = () => {
        setMenuIsOpen(!menuIsOpen)
    }

    const logout = () => {
        push("/");
        localStorage.removeItem("@ContactsKeep:TOKEN");
    }
    return <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
        <main className='container'>
            <div className="navbar-brand is-dark">
                <a className="navbar-item" href="/Home">
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
                        Documentação da API
                    </a>
                </div>
                <div className='navbar-item'>
                    <div className="control">
                        <button type='button' onClick={()=>{
                            setModalRegisterContact(true);
                        }} className="button is-dark">
                            Criar novo contato
                        </button>
                    </div>
                </div>
                <div className="navbar-end" >
                    <div className="navbar-item">
                        <div className="buttons">
                            <button onClick={() => {
                                logout();
                            }} className="button is-dark">
                                Sair
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </nav>;
}

export default HeaderAuthenticated;