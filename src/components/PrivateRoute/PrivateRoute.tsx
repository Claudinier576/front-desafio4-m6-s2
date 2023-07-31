"use client"
import { APP_ROUTES } from "@/constants/app-routes";
import { checkUserIsAuthenticated } from "@/functions/checkUserIsAuthenticated";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import RegisterContact from "../registerContact/RegisterContact";
import HeaderAuthenticated from "../HeaderAuthenticated/HeaderAuthenticated";

type PrivateRouteProps = {
    children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const { push } = useRouter();
    const [modalCreate, setModalCreate] = useState(false);

    const [isUserAuthenticated, setIsUserAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        console.log("chegou na PRIVATE");

        // Função assíncrona para verificar autenticação
        const checkAuthentication = async () => {
            let isAuthenticated = await checkUserIsAuthenticated();
            setIsUserAuthenticated(isAuthenticated);
            console.log("saporra é valida", isAuthenticated);
            if (isAuthenticated == false) {
                push(APP_ROUTES.public.login);
            }
        };

        checkAuthentication();



    }, []);



    return (
        <>
            {!isUserAuthenticated && null}
            <HeaderAuthenticated setModalRegisterContact={setModalCreate}></HeaderAuthenticated>
            {isUserAuthenticated && children}

            <RegisterContact setIsOpen={setModalCreate} isOpen={modalCreate} />
        </>
    )
}
export default PrivateRoute;
