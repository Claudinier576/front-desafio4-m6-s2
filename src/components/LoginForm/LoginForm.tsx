"use client"
import { api } from '@/api/api.connect';
import { useRouter } from 'next/navigation';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';


interface ILoginForm {
    setIsOpen: Dispatch<SetStateAction<boolean>>
    isOpen: boolean
}

export interface iLoginFormData {
    email: string;
    password: string;
}

const LoginForm: React.FC<ILoginForm> = ({ isOpen, setIsOpen }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<iLoginFormData>({
    })

    const {push} = useRouter();

    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const submit: SubmitHandler<iLoginFormData> = async (data) => {
        const token = await api.post("auth/login", JSON.stringify(data), {
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (token.status == 200) {
            reset()
            setIsOpen(false);
            const data = JSON.parse(token.data).access_token;

            localStorage.setItem("@ContactsKeep:TOKEN", "Bearer " + data)

            push("/Home")

        } else {
            const message = JSON.parse(token.data);
            setErrorMessage(message.message);
        }
    }

    return (
        <form className={`modal ${isOpen ? "is-active" : ""} `} onSubmit={handleSubmit(submit)}>
            <div className="modal-background"></div>
            <div className="modal-card ">
                <header className="modal-card-head">
                    <p className="modal-card-title">Login</p>
                    <button className="delete" onClick={() => {
                        setIsOpen(false);
                    }} type='button' aria-label="close"></button>
                </header>
                <section className="modal-card-body">
                    <label className="label">Email</label>
                    <div className="control has-icons-left">
                        <input {...register('email')} className={`input ${isEmailValid ? "is-success" : "is-danger"}`} type="email" placeholder="Email@mail.com" />
                        <span className="icon is-small is-left">
                            <i className="fas fa-envelope"></i>
                        </span>
                    </div>
                    <label className="label">Senha</label>
                    <input {...register('password')} className={`input ${isPasswordValid ? "is-success" : "is-danger"}`} type="password" placeholder="*******" />

                </section>
                <footer className="modal-card-foot">
                    <button type='submit' className="button is-success">Login</button>
                    <button className="button" type='button'>Cancelar</button>
                    <p className='colorDanger'>{errorMessage}</p>
                </footer>
            </div>
        </form>
    )

}

export default LoginForm;