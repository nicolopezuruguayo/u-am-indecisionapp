class Counter extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            count: 0
        };

        this.onIncrease = this.onIncrease.bind(this);
        this.onDecrease = this.onDecrease.bind(this);
        this.onReset = this.onReset.bind(this);

        console.log('constructor');
    };

    componentWillMount(){
        console.log('componentWillMount');
        const num = localStorage.getItem('count');
        if(num !== '' && !isNaN(num)){
            this.setState({count: parseInt(num,10)})
        }
    }

    componentDidUpdate(prevProps, prevState){
        console.log('componentDidUpdate');
        if(prevState.count !== this.state.count){
            localStorage.setItem('count',this.state.count);
        }
    }

    onIncrease(){
        this.setState((prevState)=>{return {count: prevState.count + 1}})
    }

    onDecrease(){
        this.setState((prevState)=>{return {count: prevState.count - 1}})
    }

    onReset(){
        this.setState({count: 0});
    }

    render(){
        console.log('render');
        return(
            <div>
                <Header title="Counter"/>
                <CounterPlace counter={this.state.count} />
                <Increase increase={this.onIncrease} />
                <Decrease decrease={this.onDecrease} />
                <Reset reset={this.onReset} />
            </div>
        );
    };
};

const Header = (props) => {
    return(
        <div>
            <h1>{props.title}</h1>
        </div>
    );
}

const CounterPlace = (props) => {
    return(
        <div>
            <p>{props.counter}</p>
        </div>
    );
}

const Increase = (props) => {
    return(
        <div>
            <button onClick={props.increase}>+</button>
        </div>
    );
}

const Decrease = (props) => {
    return(
        <div>
            <button onClick={props.decrease}>-</button>
        </div>
    );
}

const Reset = (props) => {
    return(
        <div>
            <button onClick={props.reset}>Reset</button>
        </div>
    );
}

ReactDOM.render(<Counter />, document.getElementById('app'));