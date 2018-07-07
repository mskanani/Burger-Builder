import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component { //Anonymous class becuase we are not using it, we are returning it
        state = {
            error: null
        }
        componentWillMount() {
            this.requestInterceptor = axios.interceptors.request.use(request => { // Whenever we send a request, we set the error state to null by default
                this.setState({
                    error: null
                });
                return request; //when sending the request, we have to return it so that the request can continue
            })  
            this.responseInterceptor = axios.interceptors.response.use(response => response, error => { //response => response the shortest way of writing an arrow function
                this.setState({
                    error: error
                });
            })
        }

        componentWillUnmount() {
            //console.log('Will Unmount', this.requestInterceptor, this.responseInterceptor);
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        errorConfirmedHandler = () => { // To close the Modal once clicked
            this.setState({
                error: null
            });
        }

        render() {
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                            {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
}

export default withErrorHandler;