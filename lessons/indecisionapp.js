class IndecisionApp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            options:[],
            title:'Indecision App!',
            subtitle:'Put your life in the hands of a computer'
        };
        this.onAddOptionHandler = this.onAddOptionHandler.bind(this);
        this.onRemoveAll = this.onRemoveAll.bind(this);
        this.onSuggest = this.onSuggest.bind(this);
        this.onOptionDelete = this.onOptionDelete.bind(this);
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
    }

    componentDidUpdate(prevProps,prevState){
        if(prevState.options.length !== this.state.options.length){
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options',json);
        }
    }

    onAddOptionHandler(option){
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

    onRemoveAll(){
        this.setState(() => {
            return{
                options:[]
            };
        });
    };

    onSuggest(){
        alert(this.state.options[Math.floor(Math.random() * this.state.options.length)]);
    };

    onOptionDelete(opt){
        this.setState((prevState) => {
            return {
                options: prevState.options.filter(option =>{
                    return option !== opt
                })
            };
        });
    };

    render(){
        return(
            <div>
                <Header title={this.state.title} subtitle={this.state.subtitle} />
                <Action 
                    removeAll={this.onRemoveAll} 
                    suggest={this.onSuggest} 
                    hasOptions={this.state.options.length > 0}/>
                <Options options={this.state.options} optionDelete={this.onOptionDelete}/>
                <AddOption addOption={this.onAddOptionHandler}/>
            </div>
        );
    };
};

const Header = (props) => {
    return(
        <div>
            <h1>{props.title}</h1>
            <p>{props.subtitle}</p>
        </div>            
    );
};

const Action = (props) => {
    return(
        <div>
            <button onClick={props.suggest} disabled={!props.hasOptions}>What should I do ?</button>
            <button onClick={props.removeAll}>Remove All</button>
        </div>
    );
};

const Options = (props) => {
    return(
        <div>
            {props.options.length === 0 && <p>Please, add an option to get started</p>}
            {props.options.map(option => <Option optionText={option} delete={props.optionDelete} />)}
        </div>
        
    );
};

const Option = (props) => {
    return (
        <div>            
            <p><button onClick={(e) => {props.delete(props.optionText)}}>X</button> {props.optionText}</p>
        </div>
    );
};

class AddOption extends React.Component {
	constructor(props){
        super(props);
        this.state = {
            error:''
        };
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    };

    onSubmitHandler(e){
        e.preventDefault();
        const option = e.target.elements.option.value.trim();
        const error = this.props.addOption(option);

        this.setState({error});

        if(!error){
            e.target.elements.option.value = '';
        }
    };

    render(){
        return(
            <div>
                {this.state.error}
                <form onSubmit={this.onSubmitHandler}>
                    <input type="text" name="option"></input>
                    <button>Add option</button>
                </form>
            </div>
        );
    };
};

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));