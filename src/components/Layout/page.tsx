import React from 'react';

type Props = {
    title: string;
    children: React.ReactNode;
}

function Page(props: Props) {
    return (
        <div>
            <h3>{props.title}</h3>
            {props.children}
        </div>
    )
}

export default Page;