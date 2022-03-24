import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSubscriptions } from '../../../redux/Subscriptions/actions';
import { Store } from "../../../types/state";

import Page from '../../../components/Layout/page';

import SubscriptionsTable from "./Table";

function Plans() {
    const dispatch = useDispatch();

    const state = useSelector((store: Store) => {
        return{
            property: store.auth.user
        }
    });

    React.useEffect(() => {
        const fetchProperties = async () => {
            await dispatch(getSubscriptions());
        }
        fetchProperties();
    }, [state.property, dispatch]); 

    return(
        <Page title="Subscriptions">
            <SubscriptionsTable />
        </Page>
    )
}

export default Plans;