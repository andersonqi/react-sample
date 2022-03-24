import React from 'react';

type Props = {
    children?: React.ReactNode;
}

function LayoutAuth(props: Props) {
    return (
        <div className="auth-container login-page">
            {props.children}
        </div>
    )
}

export default LayoutAuth;