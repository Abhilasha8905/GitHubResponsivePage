import React, { Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import { Navbar, Nav, Container, Row, Col, Form, FormControl, NavDropdown } from 'react-bootstrap';
import Repos from "./Repos"
import axios from "axios";




export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      repoData: [],
      newRepo: [],
      currentLanguage: "All",
      subHearders: ["Overview", "Respositiries", "Projects", "Stars", "Followers", "Following"],
      headers: ["Pull Request", "Issues", "Market Place", "Explore"],
      type: ["All","Public", "Private", "Sources", "Forks", "Archived","Mirrors"],
      languages: ["All", "HTML", "JavaScript", "CSS"],
      Followers:"",
      Overview: "",
      Respositiries:"",
      Projects:"",
      Stars:"",
      Following:"",
      bio:"",
      location:"",
      company :""

      



    }
    this.languageSelect = this.languageSelect.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentWillMount() {
    axios.get(`https://api.github.com/users/supreetsingh247/repos`)
      .then(res => {
        const data = res.data;
        let repoData = []
        const repos = data.map(x => {
          repoData.push({
            id: x.id,
            repo: x["name"],
            language: x["language"],
            searchValue: ""

          })
        })
        this.setState({ repoData: repoData });
      })
     
      fetch('https://api.github.com/users/supreetsingh247')
      .then( resp => resp.json())
      .then((data)=> {
          this.setState({
            Followers: data.followers,
            Following: data.following,
            Respositiries:data.public_repos,
            bio:data.bio,
            location: data.location,
            login: data.login,
            name:data.name,
            company:data.company
          })
      })
  }

  handleSearch(e) {
    this.setState({
      searchValue: e.target.value
    })
    const newRepo = this.state.repoData.filter(x => {
      return x.repo.toLowerCase().startsWith(e.target.value.toLowerCase())
    })
    this.setState({ newRepo })
  }
  languageSelect(e) {
    if (e.target.innerHTML === "All") {
      this.setState({ newRepo: [], currentLanguage: e.target.innerHTML })
    } else {
      const newRepo = this.state.repoData.filter(x => {
        return x.language === e.target.innerHTML
      })
      this.setState({ newRepo, currentLanguage: e.target.innerHTML })
    }
  }
  render() {
    const repoData = this.state.newRepo.length === 0 ? this.state.repoData : this.state.newRepo
    return (
      <div className="App">
        <Container className="fuild" style={{ maxWidth: "100%", position: "relative" }}>
          <Row style={{
            width: "100%"
          }}>
            <Navbar bg="dark" variant="dark" style={{ width: "100%" }}>
              <Navbar.Brand >GitHub</Navbar.Brand>
              <Nav className="mr-auto">
                <Form inline>
                  <FormControl type="text" placeholder="Search or jump to ...." className="mr-sm-2 " style={{ backgroundColor: "#3F4448", border: "none" }} />
                </Form>{
                  this.state.headers.map(x => {
                    return <Nav.Link>{x}</Nav.Link>
                  })
                }
              </Nav>
            </Navbar>
          </Row>
          <Row style={{
            width: "100%"
          }}>
            <Col sm={4} ><img src="https://avatars1.githubusercontent.com/u/7427552?v=4" style={{ borderRadius: "2%", width: "70% ", marginTop: "3%" }} />
              <h3 style={{ textAlign: "center" }}>{this.state.name}
     </h3><h3 style={{ textAlign: "center" }}>{this.state.login}</h3>
     <h5 style={{ textAlign: "center" }}>{this.state.bio}</h5>
     <h5 style={{ textAlign: "center" }}>{this.state.company}</h5>
     <h5 style={{ textAlign: "center" }}>{this.state.location}</h5>
              <Button style={{ width: "60%", backgroundColor: "white", color: "black  " }}>Follow</Button>
            </Col>
            <Col sm={8} >
              <Navbar bg="light" expand="lg" style={{ marginTop: "3%" }}>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                    {this.state.subHearders.map(x => {
                      x = x;
                    console.log(this.state[x])
                      return <Nav.Link >{x+"("+ this.state[x]+")"}</Nav.Link>
                    })}
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
              <hr></hr>
              <Form inline>
                <FormControl type="text" placeholder="Find a Repository" value={this.state.searchValue} style={{ width: "60%", marginTop: "10px" }} onChange={this.handleSearch} />
                <NavDropdown title="Type All" id="basic-nav-dropdown" style={{ color: "black" }} >
                  {this.state.type.map(x => {
                    return <Fragment>
                      <NavDropdown.Item value={x}>{x}</NavDropdown.Item>
                      <NavDropdown.Divider />
                    </Fragment>
                  })}
                </NavDropdown>
                <NavDropdown title={"Language " + this.state.currentLanguage} id="basic-nav-dropdown" style={{ color: "black" }}>
                  {this.state.languages.map(x => {
                    return <Fragment>
                      <NavDropdown.Item onClick={this.languageSelect} value={x}>{x}</NavDropdown.Item>
                      <NavDropdown.Divider />
                    </Fragment>
                  })}
                </NavDropdown>
              </Form>
              <hr></hr>
              <Repos repoData={repoData}></Repos>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

