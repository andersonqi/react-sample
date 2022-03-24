import React from 'react';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { getWorkers, createWorker } from '../../../redux/Workers/actions';

import Page from '../../../components/Layout/page';
import Drawer from '../../../components/Drawer';
import WorkerForm from '../../../components/Forms/Workers';

import WorkerTable from "./Table";

function Workers(){
    const [visible, setVisible] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const dispatch = useDispatch();

    React.useEffect(() => {
        const fetchWorkers = async () => {
            setLoading(true);
            await dispatch(getWorkers());
            setLoading(false);
        }
        fetchWorkers();
    }, [dispatch]); 

    const toggleDrawer = () => setVisible(!visible);

    const handleSubmit = async (values: any) => {
        let data = {
            ...values,
            status: 'inactive'
        }
        let res: any = await dispatch(createWorker(data));

        if(res.error){
            message.error('Oops! Something went wrong');
            return;
        }

        message.success('Worker created successfully');
        toggleDrawer();
    }

    return(
        <Page title="Workers">
            <WorkerTable toggleDrawer={toggleDrawer} />
            <Drawer visible={visible} title="New Worker" handleCancel={toggleDrawer} loading={loading}>
                <WorkerForm handleSubmit={handleSubmit} handleCancel={toggleDrawer} />
            </Drawer>
        </Page>
    )
}

export default Workers;