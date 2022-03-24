import React, { lazy } from 'react';
import { Switch, Redirect } from "react-router-dom";
import LayoutApp from '../../components/Layout';
import { useDispatch } from "react-redux";
import PrivateRoute from '../../utils/PrivateRoute';
import { PROPERTY_PREFIX_PATH } from '../../config/api';
import { me } from '../../redux/Auth/actions';

type Props = {};

function AppViews(props: Props) {
    const dispatch = useDispatch();

    React.useEffect(() => {
        const loadUser = async () => {
            try {
                let accessToken = localStorage.getItem('token');

                if (accessToken) {
                    await dispatch(me())
                }
            } catch (error) {
                
            }
        }
        loadUser();
    }, [dispatch]);

    return (
        <LayoutApp>
            <Switch>
                <PrivateRoute path={`${PROPERTY_PREFIX_PATH}/dashboard`} exact component={lazy(() => import(`../App/Dashboard`))} />

                <PrivateRoute path={`${PROPERTY_PREFIX_PATH}/admins`} exact component={lazy(() => import(`../App/Admins`))} />
                <PrivateRoute path={`${PROPERTY_PREFIX_PATH}/admins/:id`} exact component={lazy(() => import(`../App/Admins/Edit`))} />

                <PrivateRoute path={`${PROPERTY_PREFIX_PATH}/properties`} exact component={lazy(() => import(`../App/Properties`))} />
                <PrivateRoute path={`${PROPERTY_PREFIX_PATH}/properties/:id`} exact component={lazy(() => import(`../App/Properties/Edit`))} />

                <PrivateRoute path={`${PROPERTY_PREFIX_PATH}/categories`} exact component={lazy(() => import(`../App/Categories`))} />
                <PrivateRoute path={`${PROPERTY_PREFIX_PATH}/categories/:id`} exact component={lazy(() => import(`../App/Categories/Edit`))} />

                <PrivateRoute path={`${PROPERTY_PREFIX_PATH}/workers`} exact component={lazy(() => import(`../App/Workers`))} />
                <PrivateRoute path={`${PROPERTY_PREFIX_PATH}/workers/:id`} exact component={lazy(() => import(`../App/Workers/Edit`))} />

                <PrivateRoute path={`${PROPERTY_PREFIX_PATH}/plans`} exact component={lazy(() => import(`../App/Plans`))} />
                <PrivateRoute path={`${PROPERTY_PREFIX_PATH}/plans/:id`} exact component={lazy(() => import(`../App/Plans/Edit`))} />

                <PrivateRoute path={`${PROPERTY_PREFIX_PATH}/subscriptions`} exact component={lazy(() => import(`../App/Subscriptions`))} />
                <PrivateRoute path={`${PROPERTY_PREFIX_PATH}/subscriptions/:id`} exact component={lazy(() => import(`../App/Subscriptions/Detail`))} />

                <PrivateRoute path={`${PROPERTY_PREFIX_PATH}/services`} exact component={lazy(() => import(`../App/Services`))} />
                <PrivateRoute path={`${PROPERTY_PREFIX_PATH}/services/:id`} exact component={lazy(() => import(`../App/Services/Detail`))} />

                <PrivateRoute path={`${PROPERTY_PREFIX_PATH}/settings`} exact component={lazy(() => import(`../App/Settings`))} />

                <Redirect from={`${PROPERTY_PREFIX_PATH}`} to={`${PROPERTY_PREFIX_PATH}/dashboard`} />
            </Switch>
        </LayoutApp>
    )
}

export default AppViews;