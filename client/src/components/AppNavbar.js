import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { getBotStatus, turnBotOff, turnBotOn } from '../actions/botActions';
import { connect } from 'react-redux';

class AppNavbar extends Component {
    state = {
        isOpen: false,
        botStatusDropdownOpen: false
    }

    toggleMenu = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    toggleBotStatusDropdown = () => {
        this.setState({
            botStatusDropdownOpen: !this.state.botStatusDropdownOpen
        });
    }

    componentWillMount() {
        this.props.getBotStatus();
    }

    render() {
        let status = this.props.status;
        return (
            <div>
                <Navbar expand="sm" className="mb-4">
                        <NavbarBrand href="/">Bitmint</NavbarBrand>
                        <NavbarToggler onClick={this.toggleMenu} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                <Dropdown isOpen={this.state.botStatusDropdownOpen} toggle={this.toggleBotStatusDropdown} className='bg-transparent'>
                                    <DropdownToggle caret>
                                        Bot Status: {status 
                                        ? <span><span classname="status-icon bg-success img-circle">Online</span></span> 
                                        : <span><span classname="status-icon bg-danger img-circle">Offline</span></span> }
                                    </DropdownToggle>
                                    <DropdownMenu>
                                    <DropdownItem header>{status ? 'Online' : 'Offline'}</DropdownItem>
                                    {status ? <DropdownItem onClick={this.props.turnBotOff}>Turn bot off</DropdownItem>
                                        : <DropdownItem onClick={this.props.turnBotOn}>Turn bot on</DropdownItem>}
                                    
                                    </DropdownMenu>
                                </Dropdown>
                                    {/*<div className={status ? 'bg-success text-white' : 'bg-danger text-white'}>Bot Status</div>*/}
                                </NavItem>
                            </Nav>
                        </Collapse>
                </Navbar>
            </div>
        );
    }
    
}



const mapStateToProps = (state) => ({
    status: state.bot.status
})


export default connect(mapStateToProps, { getBotStatus, turnBotOff, turnBotOn })(AppNavbar);