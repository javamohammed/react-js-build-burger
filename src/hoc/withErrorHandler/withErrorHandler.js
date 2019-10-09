import React from 'react'
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Aux'
const withErrorHandler = (WrappedComponent, axios) => {
    return class extends React.Component {

        constructor(props){
            super(props)
            this.state = {
                error: null
            }
            this.interceptorReq =  axios.interceptors.request.use(req => {
                    this.setState({error: null});
                    return req;
                });
            this.interceptorRes = axios.interceptors.response.use(res => res, error => {
                    this.setState({error: error});
                });
        }
        CloseModal(){
            this.setState({
                error: null
            })
        }
        componentWillUnmount(){
            axios.interceptors.request.eject(this.interceptorReq)
            axios.interceptors.response.eject(this.interceptorRes)
        }
        render(){
            return (
                <Aux>
                    <Modal show={this.state.error} closeModal= {this.CloseModal.bind(this)} >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            )
        }
    }
}

export default withErrorHandler
