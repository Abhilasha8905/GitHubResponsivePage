import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import {Navbar,Nav,Container, Row, Col,Form,FormControl,NavDropdown} from 'react-bootstrap';
import Repos from "./Repos"
import axios from "axios";




export default class  App extends React.Component  {

  constructor(props){
    super(props)
    this.state ={
      repoData :[],
      newRepo:[], 
      currentLanguage :"All"
  }
  this.languageSelect = this.languageSelect.bind(this)
  this.handleSearch =this.handleSearch.bind(this)
  }

  componentWillMount(){
    axios.get(`https://api.github.com/users/supreetsingh247/repos`)
    .then(res => {
      const data = res.data;
      let repoData =[]
      const repos = data.map(x=>{
        repoData.push({
            id :x.id,
            repo:x["name"],
            language:x["language"],
            searchValue:""

        })
      })
      this.setState({ repoData:repoData });
    }) 
}

handleSearch(e){
  this.setState({
    searchValue:e.target.value
  })
  const newRepo =this.state.repoData.filter(x=>{
    return x.repo.toLowerCase().startsWith(e.target.value.toLowerCase())
  })
  this.setState({newRepo})

}

languageSelect(e){
  if(e.target.innerHTML === "All"){
    this.setState({newRepo:[], currentLanguage :e.target.innerHTML})
  }else{
    const newRepo= this.state.repoData.filter(x=>{
       return x.language === e.target.innerHTML
     })
     this.setState({newRepo,  currentLanguage : e.target.innerHTML})

  }


}
  render(){
    const repoData = this.state.newRepo.length === 0? this.state.repoData : this.state.newRepo
    return (
      <div className="App">
         <Container className ="fuild" style={{maxWidth: "100%", position: "relative"}}> 
         <Row style ={{
              width: "100%"}}>
         <Navbar bg="dark" variant="dark" style ={{width:"100%"}}>
      <Navbar.Brand href="#home">GitHub</Navbar.Brand>
      <Nav className="mr-auto">
      <Form inline>
        <FormControl type="text" placeholder="Search or jump to ...." className="mr-sm-2 " style ={{backgroundColor:"#3F4448", border:"none"}} />
      </Form>
      {/* <input type = "search" style ={{float: "left"}} placeholder="Search or jump to ...." className="mr-sm-2 search" /> */}
        <Nav.Link href="/home">Pull Request</Nav.Link>
        <Nav.Link href="/Issues">Issues</Nav.Link>
        <Nav.Link href="/Market Place">Market Place</Nav.Link>
        <Nav.Link href="/Explore">Explore</Nav.Link>
       
      </Nav>
    </Navbar> 
         </Row>
    <Row style ={{
              width: "100%"}}>
      <Col  sm={4} ><img src="https://avatars1.githubusercontent.com/u/7427552?v=4" style ={{ borderRadius :"2%", width:"70% ", marginTop:"3%"}} />
      <h3 style ={{textAlign:"center"}}>Suprajeet Singh 
     </h3><h3 style ={{textAlign:"center"}}>suprajeetsingh274</h3>
     <Button style ={{width:"60%", backgroundColor:"white", color:"black  "}}>Follow</Button>
      </Col>
      <Col  sm={8} >
      <Navbar bg="light" expand="lg" style ={{marginTop:"3%"}}>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="#home">Overview</Nav.Link>
        <Nav.Link href="/Respositiries">Respositiries</Nav.Link>
        <Nav.Link href="/Projects">Projects</Nav.Link>
        <Nav.Link href="/Stars">Stars</Nav.Link>
        <Nav.Link href="/Followers">Followers</Nav.Link>
        <Nav.Link href="/Following">Following</Nav.Link> 
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  <hr></hr>
  <Form inline>
        <FormControl type="text" placeholder="Find a Repository" value = {this.state.searchValue} style ={{ width :"60%", marginTop:"10px"}} onChange ={this.handleSearch}/>
        <NavDropdown title="Type All" id="basic-nav-dropdown" style ={{color :"black"}} >
        <NavDropdown.Item value="All">All</NavDropdown.Item>
        <NavDropdown.Divider />
          <NavDropdown.Item value = "Sources">Sources</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item value ="Forks">Forks</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item value ="Archived">Archived</NavDropdown.Item>
          <NavDropdown.Divider />
         
        </NavDropdown>
        <NavDropdown title={"Language "+this.state.currentLanguage} id="basic-nav-dropdown" style ={{color :"black"}}>
          <NavDropdown.Item value ="All"  onClick ={this.languageSelect}>All</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item value ="HTML" onClick ={this.languageSelect}>HTML</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item value ="JavaScript"  onClick ={this.languageSelect}>JavaScript</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item value ="CSS" onClick ={this.languageSelect}>CSS</NavDropdown.Item>
        </NavDropdown>
      </Form>
      <hr></hr>
      <Repos repoData ={repoData}></Repos>
         </Col>
    </Row>
  </Container>
  
  
      </div>
    );

  }
  
}

