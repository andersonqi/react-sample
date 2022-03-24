import React from 'react';
import { message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { getPlans, createPlan } from '../../../redux/Plans/actions';
import { Store } from "../../../types/state";

import Page from '../../../components/Layout/page';
import Drawer from '../../../components/Drawer';
import PlanForm from '../../../components/Forms/Plans';

import PlanTable from "./Table";

function Plans() {
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
            await dispatch(getPlans());
            setLoading(false);
        }
        fetchProperties();
    }, [state.property, dispatch]); 

    const toggleDrawer = () => setVisible(!visible);

    const handleSubmit = async (values: any) => {
        try {

            values.status = 'active';

            let res: any = await dispatch(createPlan(values));
            
            if(res.error){
                message.error('Oops. Something went wrong');
             
            }else {
                message.success('Plan created successfully')
            }

        } catch (error) {
            message.error('Oops. Something went wrong');
        }
    }

    return(
        <Page title="Plans">
            <PlanTable toggleDrawer={toggleDrawer} />
            <Drawer visible={visible} title="Create Plan" handleCancel={toggleDrawer} loading={loading}>
                <PlanForm handleSubmit={handleSubmit} handleCancel={toggleDrawer} />
            </Drawer>
        </Page>
    )
}

export default Plans;