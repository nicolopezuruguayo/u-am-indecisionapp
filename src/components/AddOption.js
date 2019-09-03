import React from 'react';

export default class AddOption extends React.Component {
    state = {error:''}

    onSubmitHandler = (e) => {
        e.preventDefault();
        const option = e.target.elements.option.value.trim();
        const error = this.props.addOption(option);

        let chave = false;

        if(error) { chave = true; }else{ chave = false; }
        
        if(!error){
            e.target.elements.option.value = '';
        }

        if(chave === true){
            this.setState({error});
            setInterval(() => {
                this.setState({error:''});
            },5000);
            chave = false;
        }
        
    };

    render(){
        return(
            <div>
                {this.state.error && <p className="add-option-error">{this.state.error}</p>}
                <form className="add-option" onSubmit={this.onSubmitHandler}>
                    <input className="add-option__input" type="text" name="option"></input>
                    <button className="button">Add option</button>
                </form>
            </div>
        );
    };
};