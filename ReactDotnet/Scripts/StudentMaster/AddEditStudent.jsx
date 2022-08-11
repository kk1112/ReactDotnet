class AddEditStudent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id:0,
            Name: '',
            RollNo: 0,
            Class: '',
            Address:''
        }
    }
    componentDidMount() {
        if (this.props.id > 0) {
        fetch("/StudentMaster/GetById?id=" + this.props.id)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    id: data.Id,
                    Name: data.Name,
                    RollNo: data.RollNo,
                    Class: data.Class,
                    Address:data.Address
                })
            })
        }
    }
    onSubmit = (e) => {        
        e.preventDefault();
        const data = {
            Id:this.state.id,
            Name: this.state.Name,
            RollNo: this.state.RollNo,
            Class: this.state.Class,
            Address: this.state.Address
        }
        console.log("Submited data", data)
        fetch("/StudentMaster/AddEditStudent", {
           method: "POST",
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(data),
        }).then(response => response.json())
            .then(data => {
                console.log("Success", data.success);
                alert(data.Message)
                window.location.href = "/StudentMaster/Index";
            }).catch((error) => {
                caches.log("error",error);
            })
    }
    onchange = (e) =>{        
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    render() {
        return (
            <div className="modal fade" id="AddEditModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" >Add/Edit Student Info</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true" onClick={this.props.CloseModal}>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form >
                                <div className="form-group">
                                    <label htmlFor="txtname" className="col-form-label">Name </label>
                                    <input type="text" className="form-control" id="txtname" name="Name" value={this.state.Name} onChange={ this.onchange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="txtRollNo" className="col-form-label">Roll No </label>
                                    <input type="text" className="form-control" id="txtRollNo" name="RollNo" value={this.state.RollNo} onChange={this.onchange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="txtClass" className="col-form-label">Class </label>
                                    <input type="text" className="form-control" id="txtClass" name="Class" value={this.state.Class} onChange={this.onchange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="txtAddress" className="col-form-label">Address</label>
                                    <textarea className="form-control" id="txtAddress" name="Address" value={this.state.Address} onChange={this.onchange}></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.props.CloseModal}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={ this.onSubmit}> Save</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}