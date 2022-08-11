class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lstMenu: []
        }
        this.LoadMenu();
    }
    LoadMenu() {
        fetch("/Home/GetMenulist").then(response => response.json())
            .then(data => {
                this.setState({
                    lstMenu: data
                })
            })
    }
    render() {
        const Menulist = this.state.lstMenu.map((menu, i) => {
            if (menu.SubMenu.length === 0) {
                return (
                    <li key={i} className="nav-item active">
                        <a className="nav-link" href={menu.Url}>{menu.Name} </a>
                    </li>
                )
            }
            else {
                return (
                    <li key={i} className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {menu.Name}
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            {
                                menu.SubMenu.map((sub, j) => {
                                    return (<a key={ j}className="dropdown-item" href={sub.SubUrl}>{sub.SubName}</a>)
                                })
                            }
                        </div>
                    </li>
                )
            }
        })
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">

                        {Menulist}
                    </ul>
                </div>
            </nav>
        )

    }
}

ReactDOM.render(<Navbar />, document.getElementById("navBar"))