// Testing github credentials. uau
class IndecisionApp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            options:['one','two','three'],
            title:'Indecision App!',
            subtitle:'Put your life in the hands of a computer'
        };
        this.onAddOptionHandler = this.onAddOptionHandler.bind(this);
        this.onRemoveAll = this.onRemoveAll.bind(this);
        this.onSuggest = this.onSuggest.bind(this);
        this.onOptionDelete = this.onOptionDelete.bind(this);
    };

    onAddOptionHandler(option){
        if(option.trim() === ''){
            return 'Option should contain a value';
        };

        if(this.state.options.indexOf(option) > -1){
            return 'This option already exists';
        }else{
            this.setState((prevState) => {
                return {
                    options: prevState.options.concat(option)
                }
            });
        }
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
                <Action removeAll={this.onRemoveAll} suggest={this.onSuggest} />
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
            <button onClick={props.suggest}>What should I do ?</button>
            <button onClick={props.removeAll}>Remove All</button>
        </div>
    );
};

const Options = (props) => {
    return(
        props.options.map(option => <Option item={option} delete={()=>props.optionDelete(option)} />)
    );
};

const Option = (props) => {
    return (
        <div>            
            <p><button onClick={props.delete}>X</button> {props.item}</p>
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
        const option = e.target.elements.option.value;
        if(this.props.addOption(option) !== undefined){
            this.setState({ error: this.props.addOption(option)});
        }else{
            this.setState({error:''})
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