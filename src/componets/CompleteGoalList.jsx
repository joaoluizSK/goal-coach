import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setCompleted} from "../actions";
import {completeGoalRef} from "../firebase";

class CompleteGoalList extends Component {

    componentDidMount() {
        completeGoalRef.on('value', snap => {
            let completeGoals = [];
            snap.forEach(completeGoal => {
                const {email, title} = completeGoal.val();
                completeGoals.push({email, title});
            })
            this.props.setCompleted(completeGoals);
        })
    }

    clearCompleted() {
        completeGoalRef.set([]);
    }

    render() {
        return (
            <div>
                {
                    this.props.completeGoals.map((completedGoal, index) => {
                        const {title, email} = completedGoal;
                        return (
                            <div key={index}>
                                <strong>{title}</strong>
                                <span style={{marginRight: '5px'}}> submitted by <em>{email}</em></span>
                            </div>
                        )
                    })
                }
                <button
                    className="btn btn-primary"
                    onClick={() => this.clearCompleted()}
                >
                    Clear All
                </button>
            </div>
        )
    }

}

function mapStateToProps(state) {
    const {completeGoals} = state;
    return {
        completeGoals
    }
}

export default connect(mapStateToProps, {setCompleted})(CompleteGoalList);