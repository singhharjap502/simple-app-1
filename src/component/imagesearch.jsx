import React from 'react';
import axios from 'axios';
import Slide from './slide.jsx'


class Images extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      data: [],
      query: '',
      currentIndex : 0,
    };
    this.searchFunction = this.searchFunction.bind(this)
    this.goToNextSlide = this.goToNextSlide.bind(this)
    this.goToPrevSlide = this.goToPrevSlide.bind(this)
  };
  searchFunction(){
    var multimediaArr = []
    var imageArr = []
    axios.get(`api/${this.state.query}`).then((response)=>{
      var data = response.data.response.docs
      data.map(title=>{
        multimediaArr.push(title.multimedia)
      })
      multimediaArr.map(media=>{
        for(var x = 0;x<media.length;x++){

          imageArr.push(media[x].url)
        }
      })
    }).then(()=>this.setState({data:imageArr})).catch(error=>console.log(error))
    console.log(this.state.data)
  }

  goToPrevSlide(){
    this.setState({currentIndex: this.state.currentIndex - 1})
  }
  
  goToNextSlide(){
    this.setState({currentIndex: this.state.currentIndex + 1})
  }

  render(){
    return(
    <div> 
            <input type="text" placeholder="Search" onChange={ev => this.setState({query: ev.target.value})}/>
      <button onClick={()=> this.searchFunction()}>Search Image</button>
      <div> {
              this.state.data.map((image, i) => (
                <Slide key={i} image={image} />
              ))
      }
            </div>
      <button onClick={()=>this.goToPrevSlide()}>prev</button> 
      <button onClick={()=>this.goToNextSlide()}>prev</button>
    </div>
    )
  }
}

export default Images;