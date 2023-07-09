import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useFetcher, useNavigate } from "react-router-dom";
import deleteIcon from "../../assets/delete-icon.svg";
import editIcon from "../../assets/edit-icon.svg";
import User from "../../Interfaces/user.interface";
interface UserCardProps {
    user: User
}

function UserCard({ user }: UserCardProps) {
    const {t} = useTranslation()
    const fetcher = useFetcher()
    const getStatusText = (status: string): string => {
        if (status == '1') {
            return 'user'
        }
        if (status == '2')
            return 'supervisor'
        if (status == '10')
            return 'admin'
        return status
    }

    return (
        <div className="card rounded-lg min-w-[200px] border-transparent border-2 my-4 p-3 shadow-lg shadow-cyan-900/50 w-10/12">
            <h1 className="font-bold text-lg tracking-wider">{`${user.email}`}</h1>
            <div>
                <span className="inline-block rounded-full w-[20px] h-[20px] bg-green-400 max-w-[100px] mt-2 mx-2 mb-0">
                </span>
                <p className="italic font-light">
                    {getStatusText(user.role!)}
                </p>
            </div>
            <div className="actions flex justify-end w-full ">
                <Link className="max-w-[100px] w-1/12 mx-3" to={'' + user.id} >
                    <img src={editIcon} alt="" />
                </Link>
                <fetcher.Form method="delete" action={"/users/" + user.id} className="max-w-[100px] w-1/12 mx-3">
                    <button type="submit" className="inline-block max-w-[100px] w-full">
                        <img src={deleteIcon} alt={t('delete')!} /> 
                    </button>
                </fetcher.Form>
            </div>

        </div>);
}

export default UserCard;