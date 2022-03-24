import React from 'react';
import { message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { getAdmins, createAdmin } from '../../../redux/Admins/actions';
import { Store } from "../../../types/state";

import Page from '../../../components/Layout/page';
import Drawer from '../../../components/Drawer';
import AdminForm from '../../../components/Forms/Admins';

import AdminTable from "./Table";

function Admins() {
    const [visible, setVisible] = React.useState(false);
    const [requesting, setRequesting] = React.useState(false);
    const dispatch = useDispatch();

    const state = useSelector((store: Store) => {
        return{
            property: store.auth.user,
        }
    });

    React.useEffect(() => {
        const fetchAdmins = async () => {
            await dispatch(getAdmins());
        }
        fetchAdmins();
    }, [state.property, dispatch]); 

    const toggleDrawer = () => setVisible(!visible);

    const handleSubmit = async (values: any) => {
        try {

            values.status = true;

            setRequesting(true);
            let res: any = await dispatch(createAdmin(values));
            setRequesting(false);

            if(res.error){
                message.error('Oops. Something went wrong');
             
            }else {
                message.success('Admin created successfully')
            }

        } catch (error) {
            message.error('Oops. Something went wrong');
        }
    }

    return(
        <Page title="Administrators">
            <AdminTable toggleDrawer={toggleDrawer} />
            <Drawer visible={visible} title="New Administrator" handleCancel={toggleDrawer} loading={requesting}>
                <AdminForm handleSubmit={handleSubmit} handleCancel={toggleDrawer} />
            </Drawer>
        </Page>
    )
}

export default Admins;