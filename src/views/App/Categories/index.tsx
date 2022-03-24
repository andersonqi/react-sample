import React from 'react';
import { message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories, createCategory } from '../../../redux/Categories/actions';
import { Store } from "../../../types/state";

import Page from '../../../components/Layout/page';
import Drawer from '../../../components/Drawer';
import CategoryForm from '../../../components/Forms/Categories';

import AdminTable from "./Table";

function Categories() {
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
            await dispatch(getCategories());
            setLoading(false);
        }
        fetchProperties();
    }, [state.property, dispatch]); 

    const toggleDrawer = () => setVisible(!visible);

    const handleSubmit = async (values: any) => {
        try {
            values.status = true;
            
            let res: any = await dispatch(createCategory(values));
            
            if(res.error){
                message.error('Oops. Something went wrong');
             
            }else {
                message.success('Category created successfully')
            }

        } catch (error) {
            message.error('Oops. Something went wrong');
        }
    }

    return(
        <Page title="Categories">
            <AdminTable toggleDrawer={toggleDrawer} />
            <Drawer visible={visible} title="New Category" handleCancel={toggleDrawer} loading={loading}>
                <CategoryForm handleSubmit={handleSubmit} handleCancel={toggleDrawer} />
            </Drawer>
        </Page>
    )
}

export default Categories;