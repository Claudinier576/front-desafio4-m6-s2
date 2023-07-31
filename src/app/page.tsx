"use client"
import Header from '@/components/Header/Header';
import LoginForm from '@/components/LoginForm/LoginForm';
import RegisterForm from '@/components/registerForm/RegisterForm';
import { useState } from 'react';

export default function Index() {
  const [modalLogin, setModalLogin] = useState(false);
  const [modalRegister, setModalRegister] = useState(false);
  return (
    <div className=''>
      <Header setModalRegister={setModalRegister} setModalLogin={setModalLogin} ></Header>
      <div className="container ">
        <div className='w-100 p-20 d-flex d-warp df-center'>
          <article className="message is-dark max-w-420 cardOne">
            <div className="message-header">
              <p>Bem-vindo(a) ao ContactsKeep</p>
            </div>
            <div className="message-body">
              O ContactsKeep é uma aplicação web intuitiva e eficiente, projetada para simplificar o gerenciamento de contatos em sua vida pessoal e profissional. Com um design limpo e amigável, você pode facilmente armazenar, editar e visualizar informações importantes de contatos, sem a necessidade de recorrer a inúmeras listas ou cadernos físicos.
            </div>
          </article>
          <article className="message is-dark max-w-420 cardTwo">
            <div className="message-header">
              <p>Principais funções</p>
            </div>
            <div className="message-body">
              Armazenamento centralizado: Esqueça a bagunça de informações de contato em diferentes dispositivos e plataformas. O ContactsKeep permite que você armazene todos os seus contatos em um único local seguro e protegido por senha.
            </div>
          </article>
        </div>

        <LoginForm setIsOpen={setModalLogin} isOpen={modalLogin}></LoginForm>
        <RegisterForm setIsOpen={setModalRegister} isOpen={modalRegister}></RegisterForm>
      </div>
    </div>
  );
}
