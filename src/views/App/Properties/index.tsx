import React from 'react';
import { message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { getProperties, createProperty } from '../../../redux/Properties/actions';
import { Store } from "../../../types/state";

import Page from '../../../components/Layout/page';
import Drawer from '../../../components/Drawer';
import PropertyForm from '../../../components/Forms/Properties';

import AdminTable from "./Table";

function Properties() {
    const [visible, setVisible] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const dispatch = useDispatch();

    const state = useSelector((store: Store) => {
        return{
            property: store.auth.user
        }
    });

    React.useEffect(() => {
        const fetchProperties = async () => {
            setLoading(true);
            await dispatch(getProperties());
            setLoading(false);
        }
        fetchProperties();
    }, [state.property, dispatch]); 

    const toggleDrawer = () => setVisible(!visible);

    const handleSubmit = async (values: any) => {
        try {
            let res: any = await dispatch(createProperty(values));
            
            if(res.error){
                message.error('Oops. Something went wrong');
                return
            }

            await dispatch(getProperties());
            message.success('Property created successfully')

        } catch (error) {
            message.error('Oops. Something went wrong');
        }
    }

    return(
        <Page title="Properties">
            <AdminTable toggleDrawer={toggleDrawer} />
            <Drawer visible={visible} title="New Property" handleCancel={toggleDrawer} loading={loading}>
                <PropertyForm handleSubmit={handleSubmit} handleCancel={toggleDrawer} />
            </Drawer>
        </Page>
    )
}

export default Properties;