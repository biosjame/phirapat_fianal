import React, {Component} from "react";
import axios from "axios";
import {ip,port} from "../setIP/setting";

export default class Register extends Component{
    constructor() {
        super();
        this.state = {
            idkey:"",
            name:"",
           // gametype:"",
            buyall:"",
            linkgame:"",
            gamelist:[]


        }
        this.handleChang = this.handleChang.bind(this);
        this.handleClicked = this.handleClicked.bind(this);
    }
    handleChang = (e) => {
        this.setState({
            [e.target.id]: e.target.value
            
        });
    }
    handleClicked(){
        let url = `https://localhost:3000/data`;
        let data = {
            idkey:this.state.idkey,
            name:this.state.name,
           // gametype:this.state.gametype,
            buyall:this.state.buyall,
            linkgame:this.state.linkgame
        }
        axios.post(url,data)
        this.setState({
            idkey:"",
            name:"",
          //  gametype:"",
            buyall:"",
            linkgame:""
        });
    }
    componentDidMount() {
        //console.log("before get data");
        this.getData();
        //console.log("after get data");
    }
    getData = () => {
        console.log("before fetch data");
        fetch('/game')
            .then(res => res.json())
            .then(list => this.setState({ gamelist:list }))
        console.log("after fetch data");
    }
    render() {
        return(
            <div>
                <div className="App">
                <h2 className="my-4">🎮🎮🎮เพิ่มข้อมูล🎮🎮🎮<br/></h2>
                    <hr/>
                </div>
                <form className="container">
                <div className="form-group">
                        <label className="text-white"  htmlFor="id">Id</label>
                        <input type="text" className="form-control" size="10" id="idkey" onChange={this.handleChang} value={this.state.idkey}/>
                    </div>
                    <div className="form-group">
                        <label className="text-white" >ชื่อ</label>
                        <input type="text" className="form-control" id="name" onChange={this.handleChang} value={this.state.name}/>
                    </div>
                    
    
                    <div className="form-group">
                        <label className="text-white"  >🎮ประเภทของเกม🎮</label>
                        <select className="form-control" id="linkgame" onChange={this.handleChang} value={this.state.linkgame} required>
                            <option>ประเภทของเกม</option>
                            {this.state.gamelist.map(datatype => {
                                return <option value={datatype.idgame}>{datatype.type}</option>
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="text-white"  htmlFor="id">เสียไปกี่บาท</label>
                        <input type="text" className="form-control" size="10" id="buyall" onChange={this.handleChang} value={this.state.buyall}/>
                    </div>
                    <a href="/Showdata">
                    <button type="button" className="btn btn-primary" onClick={this.handleClicked}>Submit</button>
                    
                    </a>
                </form>
            </div>
        );
    }
}
