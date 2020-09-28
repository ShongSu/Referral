import React from 'react';
import 'whatwg-fetch';
import IssueAdd from './IssueAdd.jsx';
import IssueFilter from './IssueFilter.jsx';

function IssueRow(props) {
    const issue = props.issue;
    return (
        <tr>
            <td>{issue.id}</td>
            <td>{issue.status}</td>
            <td>{issue.owner}</td>
            <td>{issue.created.toDateString()}</td>
            <td>{issue.effort}</td>
            <td>{issue.due ? issue.due.toDateString() : ''}</td>
            <td>{issue.title}</td>
        </tr>
    );
}

function IssueTable(props) {
    const issueRows = props.issues.map(issue =>
        <IssueRow key={issue.id} issue={issue} />
    );
    return (
        <table className="bordered-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Status</th>
                    <th>Owner</th>
                    <th>Created</th>
                    <th>Effort</th>
                    <th>Due Date</th>
                    <th>Title</th>
                </tr>
            </thead>
            <tbody>
                {issueRows}
            </tbody>
        </table>
    );
}



export default class IssueList extends React.Component {
    constructor() {
        super();
        this.state = { issues: [], hello: '' };
        // this.createIssue = this.createIssue.bind(this);
    }
    componentDidMount() {
        this.loadData();
    }
    loadData() {
        fetch('/api/hello').then(response => {
            if (response.ok) {
                response.json().then(data => {
                    this.setState({
                        hello: data.data
                    })
                });
            } else {
                response.json().then(error => {
                    alert("Failed to fetch issues:" + error.message)
                });
            }
        }).catch(err => {
            alert("Error in fetching data from server:", err);
        });
    }

    render() {
        return (
            <React.Fragment>
                <h1>Issue Tracker</h1>
                <hr />
                <h1>Issue Test</h1>
                <hr />
                <h1>{this.state.hello}</h1>
            </React.Fragment>
        );
    }
}