"use client"
import { api } from '@/api/api.connect';
import ContactCard from '@/components/ContactCard/ContactCard';
import EditUser from '@/components/EditUser/EditUser';
import { useEffect, useState } from 'react';
interface IContact {
    id: string;
    email: Array<string>;
    phone: Array<string>;
    name: string;
}
interface IUser {
    sub: string;
    username: string;
    emails: Array<string>;
    phones: Array<string>;

}
export default function Home() {
    const [contacts, setContacts] = useState<Array<IContact>>([]);
    const [userInfos, setUserInfos] = useState<IUser | null>(null);
    const [openModalUser, setOpenModalUser] = useState(false);

    useEffect(() => {
        const getInfos = async () => {
            const token = localStorage.getItem("@ContactsKeep:TOKEN")
            const dataUser = await api.get('auth/profile', { headers: { Authorization: token } });
            const dataContact = await api.get('/contact', { headers: { Authorization: token } });

            setUserInfos(JSON.parse(dataUser.data));
 

            setContacts(JSON.parse(dataContact.data));
        }
        getInfos()
    }, [])
    return (
        <div className=''>
            <div className="container">

                <button className='button right-0 is-dark' onClick={() => {
                    setOpenModalUser(true);
                }}>
                    Configurações da conta
                </button>

                <div className='w-100 p-20 d-flex d-warp df-center'>
                    {contacts.map(contact => {
                        return <ContactCard name={contact.name} key={contact.id} idContact={contact.id} emails={contact.email} phones={contact.phone} />
                    })}
                </div>
            </div>

            {userInfos ? <EditUser key={userInfos.sub} userID={userInfos.sub} phones={userInfos.phones} emails={userInfos.emails} name={userInfos.username} isOpen={openModalUser} setIsOpen={setOpenModalUser}></EditUser> : null}

        </div>
    );
}
