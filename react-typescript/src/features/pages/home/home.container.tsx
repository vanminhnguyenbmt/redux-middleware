import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HomeComponent from 'src/features/components/home/home.component';
import * as HomeAction from 'src/core/reduxs/home/home.action';
import 'src/features/pages/home/home.style.scss';
import HomeStateType from 'src/core/models/home-state.model';


type Props = {
    getListToDo: () => (dispatch: any) => void,
    home: HomeStateType
}

class HomeContainer extends Component<Props> {
    componentDidMount() {
        this.props.getListToDo();
    }

    render() {
        const { todos } = this.props.home;

        return (
            <div className="home test">
                <HomeComponent todos={todos} />
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    home: state.homeReducer,
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    getListToDo: HomeAction.actGetListTodo,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
