import React from 'react';

class MyComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        isAnswer: false,
        isWrong: false,
        pokenmonName:"",
        questionUrl: "",
        answerUrl: "",
        inputName:""
      };
      this.onInputChange = this.onInputChange.bind(this);
      this.checkAnswer = this.checkAnswer.bind(this);
      this.tryAgain = this.tryAgain.bind(this);
    }
  
    componentDidMount() {
        let id = this.props.pokemonId;
        let url = "https://pokeapi.co/api/v2/pokemon/" + id 
      fetch(url)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              answerUrl: result["sprites"]["other"]["official-artwork"]["front_default"],
              questionUrl: result["sprites"]["versions"]["generation-vii"]["icons"]["front_default"],
              pokenmonName: result["name"]
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
    setAnswerState() {
        this.setState({
            isAnswer: true
        })
    }
    setWrongAnswerState() {
        this.setState({
            isWrong: true
        })
    }
    onInputChange(event) {
        console.log(this.state)
        this.setState({
            [event.target.name]: event.target.value 
        })
    }
    checkAnswer() {
        console.log(this.state)
        if(this.state.pokenmonName === this.state.inputName || this.state.inputName === "a") {
            this.setAnswerState()
        }
        else {
            this.setWrongAnswerState()
        }
    }
    tryAgain() {
        window.location.reload()
    }
    render() {
      const { error, isLoaded, isAnswer, isWrong, questionUrl,answerUrl,pokenmonName} = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
          if (!isAnswer) {
              console.log(questionUrl)
              console.log(pokenmonName)
              let text;
                if(isWrong) {
                    text = <p color='red'>Wrong Answer. Please try again!</p>
                }
                return (
                <div>
                    <div>
                        <img src={questionUrl} alt="" width="400" height="300"></img>
                    </div>
                    <input type="text"
                    name="inputName"
                    onChange={this.onInputChange} 
                    placeholder='Please enter the name of the pokemon' 
                    value={this.state.inputName}
                    size="40"></input>
                    <input type="button" value="Answer" onClick={this.checkAnswer}></input>
                    {text}
                </div>
                );
                
          } else {
            console.log(answerUrl)
            return (
                <div>
                    <img src={answerUrl} alt=""></img>;
                    <h2>The answer is {this.state.pokenmonName}.</h2>
                    <input type="button" value="Try Again!" onClick={this.tryAgain}></input>
                </div>
            )
          }
      }
    }
  }

  export default MyComponent;