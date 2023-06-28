import { useLoaderData, useNavigate } from "react-router-dom";
import PrimaryButton from "../../Components/utils/PrimaryButton";
import AreaCard from "../../Components/areas/AreaCard";
import PaginatedResponse from "../../Interfaces/paginatedResponse.interface";
import Area from "../../Interfaces/area.interface";
import PaginationComponent from "../../Components/utils/PaginationComponent";
import { useTranslation } from "react-i18next";

function indexArea() {

    const {t} = useTranslation()
    let navigate= useNavigate()
    // const areas = [
    //     {
    //         id: 1,
    //         name: '204',
    //         type: 1,
    //         status: 1
    //     },
    //     {
    //         id: 2,
    //         name: '205',
    //         type: 1,
    //         status: 1
    //     },
    //     {
    //         id: 3,
    //         name: '102',
    //         type: 2,
    //         status: 1
    //     },
    // ]
    const {items:areas, meta, links} = useLoaderData() as PaginatedResponse<Area>
    return (<>
        <PrimaryButton onClick={() => {
            navigate('create')
        }}>
            {t('create')} {t('area')}
        </PrimaryButton>
        {t('list_of')} {t('areas')}
        {areas.map(area => <AreaCard area={area} key={area.id}></AreaCard>)}
        <PaginationComponent links={links} meta={meta!} />
    </>);
}

export default indexArea;