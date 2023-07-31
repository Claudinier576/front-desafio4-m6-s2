import { api } from '@/api/api.connect';
import React, { Dispatch, SetStateAction, useState } from 'react';
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

const RegisterForm: React.FC<IRegisterForm> = ({ isOpen, setIsOpen }) => {
    const [errorMessage,setErrorMessage] = useState("");
    const { register, handleSubmit, reset, formState: { errors } } = useForm<iRegisterFormData>({
    })
    const submit: SubmitHandler<iRegisterFormData> = async (data) => {

        const register = await api.post("users", JSON.stringify({
            name: data.name,
            email: [data.email, data.email2],
            phone: [data.phone, data.phone2],
            password: data.password
        }), {
            headers: {
                "Content-Type": "application/json"
            }
        });
        if(register.status == 201){
            reset()
            setIsOpen(false);
        }else{
            const message = JSON.parse(register.data);
            setErrorMessage(message.message);
        }

    }
    return (
        <form className={`modal ${isOpen ? "is-active" : ""} `} onSubmit={handleSubmit(submit)}>
            <div className="modal-background is-dark"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Registro</p>
                    <button className="delete" type='button' aria-label="close" onClick={() => {
                        setIsOpen(false);
                    }}></button>
                </header>
                <section className="modal-card-body">
                    <label className="label">Nome</label>
                    <input {...register("name")} className="input is-danger" required={true} type="text" placeholder="Nome Completo" />
                    <label className="label">Email</label>
                    <div className="control has-icons-left">
                        <input {...register("email")} required={true} className="input is-danger" type="email" placeholder="Email@mail.com" />
                        <span className="icon is-small is-left">
                            <i className="fas fa-envelope"></i>
                        </span>
                    </div>
                    <label className="label">Email 2(opicional)</label>
                    <div className="control has-icons-left">
                        <input {...register("email2")} className="input" required={false} type="email" placeholder="Email@mail.com" />
                        <span className="icon is-small is-left">
                            <i className="fas fa-envelope"></i>
                        </span>
                    </div>
                    <label className="label">Celular</label>
                    <input {...register("phone")} required={true} className="input is-danger" type="number" placeholder="DDD999999999" />
                    <label className="label">Celular 2 (opcional)</label>
                    <input {...register("phone2")} required={false} className="input is-danger" type="number" placeholder="DDD999999999" />
                    <label className="label">Senha</label>
                    <input {...register("password")} className="input is-danger" type="password" placeholder="*******" />

                </section>
                <footer className="modal-card-foot">
                    <button type='submit' className="button is-success">Registar</button>
                    <button className="button" type='button'>Cancelar</button>
                    <p className='colorDanger'>{errorMessage}</p>
                </footer>
            </div>
        </form>
    )

}

export default RegisterForm;