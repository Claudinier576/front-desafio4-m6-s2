"use client"
import { api } from "@/api/api.connect";
import { useEffect, useState } from "react";
interface InputData {
    id: string;
    value: string;
}
interface IContactProps {
    idContact: string;
    phones: Array<string>;
    emails: Array<string>;
    name: string;

}

const ContactCard = ({ idContact, emails, phones, name }: IContactProps) => {
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
    const deleteContact = async () => {
        const token = localStorage.getItem("@ContactsKeep:TOKEN");
        await api.delete('contact/' + idContact, { headers: { Authorization: token } });
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
        });

        const update = await api.patch("contact/" + idContact, data, {
            headers: {
                Authorization: token,
                "Content-Type": "application/json"
            }
        });

        if (update.status == 200) {

        }

    }
    return (
        <>
            <div className="card max-w-420">
                <header className="card-header">
                    <p className="card-header-title">
                        {name}
                    </p>
                </header>
                <div className="card-content">
                    <div className="content">
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
                </div>
                <footer className="card-footer">
                    <a href="#" className="card-footer-item" onClick={async () => {
                        await saveContact()
                    }}>Salvar</a>
                    <a href="#" className="card-footer-item" onClick={async () => {
                        await deleteContact();
                    }}>Deletar</a>
                </footer>
            </div>
        </>
    )
}

export default ContactCard;