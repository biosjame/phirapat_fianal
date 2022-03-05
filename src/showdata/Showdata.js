import React, {Component} from "react";
import axios from "axios";
import Modal from 'react-awesome-modal';
import './Showdata.css';
//import '../../server/app';
import {ip,port} from "../setIP/setting";

export default class Showdata extends Component{
    constructor() {
        super();
        this.state ={
            list:[],
            name:"",
            idkey:"",
            buyall:"",
            datatype:""
        }
        this.handleChang = this.handleChang.bind(this);
        this.handleClicked = this.handleClicked.bind(this);
        //console.log("hello show data");
    }
    componentDidMount() {
        //console.log("before get data");
        this.getData();
        //console.log("after get data");
    }
    getData = () => {
        console.log("before fetch data");
        fetch('/data')
            .then(res => res.json())
            .then(list => this.setState({ list }))
        console.log("after fetch data");
    }

    onDelete=(user)=>{
        let url = `https://localhost:3000/delete`;
        let data = {
            idkey:user.id
        }
        axios.put(url,data)
        setTimeout(()=>{this.componentDidMount()},1)
    }

    openModal() {
        this.setState({
            visible : true
        });

    }
    closeModal() {
        this.setState({
            visible : false
        });
    }
    call=(user)=>{
        this.openModal();
        this.setState({
            name:user.name,
            idkey:user.id,
           
            buyall:user.buyall,
            datatype:user.datatype
         
        })
    }
    handleChang = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
        let url = `https://localhost:3000/data`;
        let data = {
            name:this.state.name,
            idkey:this.state.idkey,
           // gametype:this.state.gametype,
            buyall:this.state.buyall,
            datatype:this.state.datatype
            
          
        }
        axios.put(url,data)
    }

    handleClicked(){
        let url = `https://localhost:3000/data`;
        let data = {
            name:this.state.name,
            idkey:this.state.idkey,
            gametype:this.state.gametype,
            buyall:this.state.buyall,
            datatype:this.state.datatype
           
        }
        axios.put(url,data)
        this.setState({
            name:"",
            idkey:"",
            gametype:"",
            buyall:""
        
        });
	this.closeModal();
        setTimeout(()=>{this.componentDidMount()},1)
    }
    render() {
        let {list} = this.state;

        return (
            <div className="App">
                <h2 className="my-4">โชว์การเล่นเกมประเภทต่างๆของวัยรุ่น<br/></h2>
                <hr/>
                <div className="container p-3 my-3 bg-dark text-white">
                    <table className="table table-dark">
                        <thead>
                            <tr>
                            <th>id</th> 
                            <th>ชื่อ</th>
                            <th>ประเภทของเกม</th>
                            <th>เสียไปกี่บาท</th>
                            </tr>
                        </thead>
                        <tbody>
                                {list.map((user) =>{
                                    return(
                                        <tr>
                                            <td>{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.gametype}</td>
                                            <td>{user.buyall}</td>
                                            <td><button type="button" class="btn btn-warning" onClick={()=>this.call(user)}>Edit</button></td>
                                            <td><button type="button" class="btn btn-danger"  onClick={()=>this.onDelete(user)}>Delete</button></td>
                                            <div className="box">
                                                <Modal visible={this.state.visible}
                                                       width="1200"
                                                       height="600"
                                                       effect="fadeInUp"
                                                       onClickAway={() => this.closeModal()}
                                                >
                                                    <form className="container" id='form'>
                                                    
                                                        <div className="form-group">
                                                            <h3><label htmlFor="id">id: {this.state.idkey}<br/></label></h3>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>name:</label>
                                                            <input type="text" className="form-control" id="name" onChange={this.handleChang} value={this.state.name}/>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>gametype:</label>
                                                            <input type="text" className="form-control" id="gametype" onChange={this.handleChang} value={this.state.gametype}/>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>buyall:</label>
                                                            <input type="text" className="form-control" id="buyall" onChange={this.handleChang} value={this.state.buyall}/>
                                                        </div>
                                                        <button type="button" className="btn btn-primary" onClick={this.handleClicked}>Submit</button>
                                                    </form>
                                                </Modal>
                                            </div>
                                        </tr>
                                    )})}
                        </tbody>
                    </table>
                </div><br/>
            </div>
        );
    }
}
