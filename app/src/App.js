import React from 'react';
import axios from 'axios';
class  App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      users:[],
      id:0,
      Nome:'',
      Email:'',
      Senha:''
    }
  }
  componentDidMount(){
    axios.get("http://localhost:8080/api/")
    .then((res)=>{
      this.setState({
        users:res.data,
        id:0,
        Nome:'',
        Email:'',
        Senha:''
      })
    })
  }
  submit(evenet,id){
    console.log(id)
    evenet.preventDefault();
    if(id===0){
      axios.post("http://localhost:8080/api/",{
        nome:this.state.nome,
        email:this.state.email,
        senha:this.state.senha
      }).then(()=>{
        this.componentDidMount();
      })
    }else{
      axios.put("http://localhost:8080/api/",{
        id:id,
        nome:this.state.nome,
        email:this.state.email,
        senha:this.state.senha
      }).then(()=>{
        this.componentDidMount();
      })
    }
  }
  delete(id){
    axios.delete("http://localhost:8080/api/"+id)
    .then(()=>{
      this.componentDidMount();
    })
  }
  edit(id){
    axios.get("http://localhost:8080/api/"+id)
    .then((res)=>{
      this.setState({
        id:res.data.id,
        nome:res.data.nome,
        email:res.data.email,
        senha:res.data.senha
      });
    }) 
  }
  render(){
    return (
      <div className="container">
         <div className="row">
         <div className="col s6">
                 <form onSubmit={(e)=>this.submit(e,this.state.id)}>
                 <div className="input-field col s12">
                    <i className="material-icons prefix">person</i>
                    <input value={this.state.nome} onChange={(e)=>this.setState({nome:e.target.value})} type="text" id="autocomplete-input" className="autocomplete"  />
                    <label htmlFor="autocomplete-input">Nome</label>
                  </div>
                  <div className="input-field col s12">
                    <i className="material-icons prefix">mail</i>
                    <input value={this.state.email} onChange={(e)=>this.setState({email:e.target.value})} type="email" id="autocomplete-input" className="autocomplete"  />
                    <label htmlFor="autocomplete-input">Email</label>
                  </div>
                  <div className="input-field col s12">
                    <i className="material-icons prefix">vpn_key</i>
                    <input value={this.state.senha} onChange={(e)=>this.setState({senha:e.target.value})} type="password" id="autocomplete-input" className="autocomplete"  />
                    <label htmlFor="autocomplete-input">Senha</label>
                  </div>
                  <button className="btn waves-effect waves-light right" type="submit" name="action">Enviar
                    <i className="material-icons right">enviar</i>
                  </button>
                 </form>
          </div>          
          <div className="col s6">
          <table>
        <thead>
          <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Senha</th>
              <th>Editar</th>
              <th>Deletar</th>
          </tr>
        </thead>

        <tbody>
            {
              this.state.users.map(user =>
                  <tr key={user.id}>
                      <td>{user.nome}</td>
                      <td>{user.email}</td>
                      <td>{user.senha}</td>
                      <td>
                        <button onClick={(e)=>this.edit(user.id)} className="btn waves-effect waves-light" type="submit" name="action">
                          <i className="material-icons ">editar</i>
                        </button>       
                      </td>
                      <td>
                        <button onClick={(e)=>this.delete(user.id)} className="btn waves-effect waves-light " type="submit" name="action">
                          <i className="material-icons ">deletar</i>
                        </button>       
                      </td>
                  </tr>
                )
            }
         

        </tbody>
      </table>
          </div>                
          </div>              
      </div>
    );
  }
}

export default App;
