import React from "react"
import Button from 'react-bootstrap/Button';


export default class Repos extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                {this.props.repoData.map((x)=>{
                   return  <div>
                        <Button style ={{float:"right", backgroundColor:"white", color:"black", borderColor:"black"}}>Star</Button>
                <h3 style = {{color :"blue", textAlign:"left"}}>{x.repo}</h3><br></br>
                <h5 style = {{ textAlign:"left"}}>{x.language}</h5>
               
                <hr></hr>
                    </div>
                })}
            </div>
        )
    }
}