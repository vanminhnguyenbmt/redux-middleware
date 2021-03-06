import React, { useMemo } from 'react';
import _ from 'lodash';

const HomeComponent = (props) => {

    const mListTodo = useMemo(() => {
        if (_.isEmpty(props.todos) || !_.isArray(props.todos)) return <></>;

        return props.todos.map((item, index) => (
            <li key={index}>
                <h3>{item.title}</h3>
            </li>
        ));
    }, [props.todos])

    return (
        <>
            <h1>Redux example</h1>
            <hr />
            <ul>
                {mListTodo}
            </ul>
        </>
    );
};

export default HomeComponent;
