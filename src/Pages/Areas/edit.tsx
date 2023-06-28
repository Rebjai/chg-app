import { useTranslation } from "react-i18next";
import { useLoaderData, useLocation, useNavigate, useParams } from "react-router-dom";
import AreaForm from "../../Components/areas/AreaForm";
import PrimaryButton from "../../Components/utils/PrimaryButton";
import Area from "../../Interfaces/area.interface";

function EditArea() {
    const {t} = useTranslation()
    const navigate = useNavigate()
    const {id} = useParams()
    
    const createArea =  useLocation().pathname.split('/')[2] == 'create'
    
    const area :Area = useLoaderData() as Area
    // const area :Area = {
    //     id: 1,
    //     name: '204',
    //     status: 2,
    //     type: 1,
    // }
    return ( <>

    <PrimaryButton type="reset" onClick={()=>{navigate('/areas')}}>{t('back')}</PrimaryButton>
    <h1 className="font-bold text-3xl m-2">
    {createArea? t('create'): t('edit')}
    </h1>
    {t('info_for')} {t('area')}
    {createArea? <AreaForm />: <AreaForm area={area}/>} 
    </> );
}

export default EditArea;