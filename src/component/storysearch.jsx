import React from 'react';
import axios from 'axios';

class Text extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      data: [],
      query: ''
    };
    this.searchFunction = this.searchFunction.bind(this)
  };
  searchFunction(){
    var titileArr = []
    axios.get(`api/${this.state.query}`).then((response)=>{
      var data = response.data.response.docs
      data.map(title=>{
        titileArr.push(title.abstract)
        this.setState({
          data : titileArr
        })
      })
    }).catch(error=>console.log(error))
    console.log(this.state.data)
  }

  render(){
    return(
    <div> 
      <input type="text" placeholder="Search" onChange={ev => this.setState({query: ev.target.value})}/>
      <button onClick={()=>this.searchFunction()}>Search article</button>
      <br/>
      <br/>
      <div id="search">{
        this.state.data.map((title)=> {
         return <span >{title}</span>}
         )
        }
        </div>
    </div>
    )
  }
}

export default Text;