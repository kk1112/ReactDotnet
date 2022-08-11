class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Studentlist: [],
            Id: 0,
            IsModalOpen: false,
            IsDeleteModalOpen:false
        }        
    }

    componentDidMount() {
        this.getStudent()
    }
    getStudent = () => {
        fetch("/StudentMaster/StudentList").then(response => response.json())
            .then(data => {
                this.setState({ Studentlist: data.StudentList })
            })
    }
    render() {
        const row = this.state.Studentlist.map((list, i) => {
            return (
                <tr key={i}>
                    <td>{list.Name}</td>
                    <td>{list.RollNo}</td>
                    <td>{list.Class}</td>
                    <td>{list.Address}</td>
                    <td><button type="button" className="btn btn-primary" data-toggle="modal" data-target="#AddEditModal" onClick={() => { this.setState({ IsModalOpen: true, Id: list.Id }) }}>Edit</button>                       
                    <span>|</span>
                    <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#deleteStudent" onClick={() => { this.setState({ IsDeleteModalOpen: true, Id: list.Id }) }}>Delete</button>
                    </td>
                </tr>
            )
        })
        return (
            <div>
                <div className="float-right mr-4 mb-2">
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#AddEditModal" onClick={() => { this.setState({ IsModalOpen:true})} }>Add</button>
                </div>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Roll No</th>
                            <th scope="col">Class</th>
                            <th scope="col">Address</th>
                            <th> Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {row}

                    </tbody>
                </table>
                {this.state.IsModalOpen == true ? <AddEditStudent id={this.state.Id} CloseModal={() => { this.setState({ IsModalOpen: false }) }} /> : null}
                {this.state.IsDeleteModalOpen == true ? <DeleteStudent id={this.state.Id} CloseModal={() => { this.setState({ IsDeleteModalOpen: false }) }} reload={ this.getStudent}/>:null}
            </div>
        )
    }
}

class DeleteStudent extends React.Component {
    constructor(props) {
        super(props)

    }
    onDelete = () => {
        fetch("/StudentMaster/RemoveStudent?id=" + this.props.id).
            then(response => response.json())
            .then(data => {
                alert(data.Message);
                this.props.reload();
            })
    }
    render() {
        return (
            <div className="modal" id="deleteStudent" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Delete</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure ?.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={ this.onDelete.bind(this)}>OK</button>
                        </div>
                    </div>
                </div>
            </div>
            )
    }
}

ReactDOM.render(<Index />, document.getElementById("Studentlist"))