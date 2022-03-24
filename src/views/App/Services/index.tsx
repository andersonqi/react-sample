import React from 'react';
import { useDispatch } from 'react-redux';
import { getWorks, getWorksByDate } from '../../../redux/Works/actions';

import Page from '../../../components/Layout/page';

import ServicesTable from "./Table";

function Services(){
    const dispatch = useDispatch();

    React.useEffect(() => {
        const fetchWorks = async () => {
            await dispatch(getWorks());
        }
        fetchWorks();
    }, [dispatch]);

    const handleDateChange = async (date: any, dateString: any) => {
        if(date === null){
            await dispatch(getWorks());
            return
        }
        await dispatch(getWorksByDate(dateString[0], dateString[1]))
    }

    return(
        <Page title="Services">
            <ServicesTable handleDateChange={handleDateChange} />
        </Page>
    )
}

export default Services;