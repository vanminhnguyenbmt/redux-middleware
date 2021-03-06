import React, { useMemo } from 'react';
import _ from 'lodash';
import Todo from 'src/core/models/todo.model';
import { useIntl } from 'react-intl';

type Props = {
    todos: Array<Todo>
}

const HomeComponent = (props: Props): JSX.Element => {
    const intl = useIntl();

    const mListTodo = useMemo(() => {
        if (_.isEmpty(props.todos) || !_.isArray(props.todos)) return <></>;

        return props.todos.map((item: Todo, index: number) => (
            <li key={index}>
                <h3>{item.title}</h3>
            </li>
        ));
    }, [props.todos])

    return (
        <>
            <h1>{intl.formatMessage({ id: 'HOME.TITLE' }, { _0: 2021 })}</h1>
            <hr />
            <ul className='d-in-block'>
                {mListTodo}
            </ul>
        </>
    );
};

export default HomeComponent;
