import { api } from '@/api/api.connect';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
interface IRegisterForm {
    setIsOpen: Dispatch<SetStateAction<boolean>>
    isOpen: boolean
}

export interface iRegisterFormData {
    name: string;
    email: string;
    email2: string;
    phone: string;
    phone2: string;
    password: string;
}
interface InputData {
    id: string;
    value: string;
}
const RegisterContact: React.FC<IRegisterForm> = ({ isOpen, setIsOpen }) => {
    const [inputsEmail, setInputsEmail] = useState<InputData[]>([]);
    const [inputsPhones, setInputsPhones] = useState<InputData[]>([]);
    const [name, setName] = useState<string>("");

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

        setInputsEmail([]);
        setInputsPhones([]);
        setName("");
        setIsOpen(false);

    }
    const saveContact = async () => {

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
            name: name
        });


        const save = await api.post("contact/", data, {
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
                    <p className="modal-card-title">Novo contato</p>
                    <button className="delete" aria-label="close" onClick={() => {
                        cancelCreate();
                    }}></button>
                </header>
                <div className="modal-card-body">
                    <div className="ContactList">
                        <h2>Nome</h2>
                        <input type="text" value={name} className="input" onChange={(e) => setName(e.target.value)} />
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

                    <br />
                </div>
                <footer className="modal-card-foot">
                    <a href="#" className="button " onClick={async () => {
                        await saveContact()
                    }}>Salvar</a>
                    <a href="#" className="button " onClick={async () => {
                        cancelCreate();
                    }}>Cancelar</a>
                </footer>
            </div>
        </div>
    </>

    )

}

export default RegisterContact;