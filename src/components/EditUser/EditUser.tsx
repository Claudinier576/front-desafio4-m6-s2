import { api } from '@/api/api.connect';
import { userInfo } from 'os';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
interface IupdateUser {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    isOpen: boolean;
    name: string;
    emails: Array<string>;
    phones: Array<string>;
    userID: string;
}

export interface IupdateUserData {
    name: string;
    emails: Array<string>;
    phone: Array<string>;
    password: string;
}
interface InputData {
    id: string;
    value: string;
}
const EditUser = ({ isOpen, setIsOpen, emails, name, phones, userID }: IupdateUser) => {
    const [updatePass, setUpdatePass] = useState<boolean>(false);
    const [nameUser, setNameUser] = useState<string>(name);
    const [newPass, setNewPass] = useState<string>("");
    const [currentPass, setCurreentPass] = useState<string>("");
    const [inputsEmail, setInputsEmail] = useState<InputData[]>([]);
    const [inputsPhones, setInputsPhones] = useState<InputData[]>([]);

    useEffect(() => {
        const addEmails: InputData[] = []

        emails.map(email => {
            addEmails.push({ id: Date.now().toString() + Math.random(), value: email })
        });
        setInputsEmail([...inputsEmail, ...addEmails])
        const addPhones: InputData[] = []
        phones.map(phone => { 
            addPhones.push({ id: phone, value: phone });
        });
        setInputsPhones([...inputsPhones, ...addPhones])
    }, []);

    const handleAddInputEmail = () => {
        setInputsEmail([...inputsEmail, { id: Date.now().toString(), value: '' }]);
    };
    const handleDeleteInputEmail = (id: string) => {
        setInputsEmail(inputsEmail.filter((input) => input.id !== id));
    };
    const handleChangeEmail = (id: string, value: string) => {
        const updatedInputs = inputsEmail.map((input) =>
            input.id === id ? { ...input, value } : input
        );
        setInputsEmail(updatedInputs);
    };
    const handleAddInputPhones = () => {
        setInputsPhones([...inputsPhones, { id: Date.now().toString(), value: '' }]);
    };
    const handleDeleteInputPhones = (id: string) => {
        setInputsPhones(inputsPhones.filter((input) => input.id !== id));
    };
    const handleChangePhones = (id: string, value: string) => {
        const updatedInputs = inputsPhones.map((input) =>
            input.id === id ? { ...input, value } : input
        );
        setInputsPhones(updatedInputs);
    };
    const cancelCreate = () => {
        setIsOpen(false);
    }
    const saveUser = async () => {

        const emails = []
        for (const email in inputsEmail) {
            const element = inputsEmail[email];
            emails.push(element.value);
        }
        const phones = []
        for (const phone in inputsPhones) {
            const element = inputsPhones[phone];
            phones.push(element.value);
        }
        const token = localStorage.getItem("@ContactsKeep:TOKEN");

        const data = JSON.stringify({
            email: emails,
            phone: phones,
            name: nameUser,
            password: newPass,
            currentPass: currentPass,
        });

        const save = await api.patch("users/"+userID , data, {
            headers: {
                Authorization: token,
                "Content-Type": "application/json"
            }
        });




        if (save.status == 201) {
            cancelCreate()
        }

    }



    return (<>
        <div className={`modal ${isOpen ? "is-active" : ""}`} >
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Configurações</p>
                    <button className="delete" aria-label="close" onClick={() => {
                        cancelCreate();
                    }}></button>
                </header>
                <div className="modal-card-body">
                    <div className="ContactList">
                        <h2>Nome</h2>
                        <input type="text" value={nameUser} className="input" onChange={(e) => setNameUser(e.target.value)} />
                    </div>
                    <div className="ContactList">
                        <h2>Emails</h2>
                        {inputsEmail.map((input) => (
                            <div className="d-flex df-center has-icons-right ">
                                <input type="text" id={input.id} value={input.value} className="input" onChange={(e) => handleChangeEmail(input.id, e.target.value)} />
                                <span className="icon is-small is-right iconHouver"  >
                                    <i className="fa-solid fa-trash" onClick={() => handleDeleteInputEmail(input.id)}></i>
                                </span>
                            </div>
                        ))}
                        <button className="button" onClick={handleAddInputEmail}>Adicionar Email</button>
                    </div>
                    <div className="ContactList">
                        <h2>Numeros</h2>
                        {inputsPhones.map((input) => (
                            <div className="d-flex df-center has-icons-right ">
                                <input type="text" value={input.value} className="input" onChange={(e) => handleChangePhones(input.id, e.target.value)} />
                                <span className="icon is-small is-right iconHouver"  >
                                    <i className="fa-solid fa-trash" onClick={() => handleDeleteInputPhones(input.id)}></i>
                                </span>
                            </div>
                        ))}
                        <button className="button" onClick={handleAddInputPhones}>Adicionar Numero</button>
                    </div>
                    <div className="ContactList">
                        <h2>Senha Atual</h2>
                        <input type="password" className="input" onChange={(e) => setCurreentPass(e.target.value)} />
                    </div>
                    <div className="">
                        <input type='checkbox' className='checkbox' onChange={(e) => {
                            setUpdatePass(Boolean(e.target.checked))
                        }}></input>
                        <label>Editar Senha</label>
                    </div>
                    <div className={`ContactList ${updatePass ? "" : "d-none"}`}>
                        <h2>Nova Senha</h2>
                        <input type="password" className="input" onChange={(e) => setNewPass(e.target.value)} />
                    </div>


                    <br />
                </div>
                <footer className="modal-card-foot">
                    <a href="#" className="button " onClick={async () => {
                        await saveUser()
                    }}>Salvar</a>
                    <a href="#" className="button " onClick={async () => {
                        cancelCreate();
                    }}>Deletar</a>
                    <a href="#" className="button " onClick={async () => {
                        cancelCreate();
                    }}>Cancelar</a>
                </footer>
            </div>
        </div>
    </>

    )

}

export default EditUser;