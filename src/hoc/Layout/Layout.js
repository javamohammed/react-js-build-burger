import React from 'react'
import Aux from '../Aux'
import { connect } from 'react-redux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import  './Layout.css'
class Layout extends React.Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        })
    }
    drawerToggleClicked = () => {
        this.setState(prevState => {
            return {showSideDrawer : !prevState.showSideDrawer}
        })
    }
    render(){
        return(
                <Aux>
                    <SideDrawer isAuth={this.props.isAuth} open={this.state.showSideDrawer} closed={this.drawerToggleClicked}/>
                    <Toolbar isAuth={this.props.isAuth} clicked={this.drawerToggleClicked}/>
                    <main className = 'content' >
                        {this.props.children}
                    </main>
                </Aux>
            )
    }
}
const mapStateToProps = (state) => {
return {
    isAuth : state.auth.token !== null
 }
}

export default connect(mapStateToProps)(Layout)