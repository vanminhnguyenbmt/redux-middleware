import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HomeComponent from 'src/features/components/Home/Home.component';
import * as HomeAction from 'src/core/reduxs/Home/Home.action';
import 'src/features/pages/Home/Home.style.scss';

class HomeContainer extends Component {
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

const mapStateToProps = (state) => ({
    home: state.homeReducer,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getListToDo: HomeAction.actGetListTodo,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
