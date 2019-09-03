import React from 'react';
import AddOption from './AddOption';
import Options from './Options';
import Header from './Header';
import Action from './Action';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {

    state = { 
        options:[],
        title:'Indecision App!',
        subtitle:'Put your life in the hands of a computer',
        selectedOption: undefined
    };

    onAddOptionHandler = option => {
        if(option === ''){
            return 'Option should contain a value';
        };

        if(this.state.options.indexOf(option) > -1){
            return 'This option already exists';
        }

        this.setState((prevState) => {
            return {
                options: prevState.options.concat(option)
            }
        });
    };

    onRemoveAll = () => {
        this.setState({options:[]});
    };

    handlePick = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        this.setState({selectedOption:option});
    };

    onCloseModal = () => {
        this.setState({selectedOption:undefined});
    }

    onOptionDelete = opt => {
        this.setState((prevState) => {
            return {
                options: prevState.options.filter(option =>{
                    return option !== opt
                })
            };
        });
    };

    componentDidMount(){
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            if(options){
                this.setState(() => ({options}))
            }
        } catch (error) {
            console.log(error);
        }
    };

    componentDidUpdate(prevProps,prevState){
        if(prevState.options.length !== this.state.options.length){
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options',json);
        };
    };

    render(){
        return(
            <div>
                <Header title={this.state.title} subtitle={this.state.subtitle} />
                <div className="container">
                    <div className="widget">
                        <Action 
                            suggest={this.handlePick} 
                            hasOptions={this.state.options.length > 0}/>
                        <Options 
                            removeAll={this.onRemoveAll} 
                            options={this.state.options} 
                            optionDelete={this.onOptionDelete}
                        />
                        <AddOption addOption={this.onAddOptionHandler}/>
                    </div>
                </div>
                <OptionModal 
                    selectedOption={this.state.selectedOption}
                    closeModal={this.onCloseModal}
                />
            </div>
        );
    };
};