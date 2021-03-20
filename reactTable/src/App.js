import React, { Component } from 'react';
import Navbar from "./components/navbar/Navbar";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const tablaMusica =[
  { Nombre:"7 years", Album:"Lukas Graham", Artista:"LuKas Graham", Año:"2015", Genero:"pop", link:"https://www.youtube.com/watch?v=LHCob76kigA"},
  { Nombre:"In the fire", Album:"People", Artista:"Hillsong", Año:"2019", Genero:"gospel"}
  
];
const paginacionOpciones={
  rowsPerPageText: 'Filas por Página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
}

class App extends Component {
  state={
    busqueda: '',
    musica: [],
    columnas:[]
  }

  onChange=async e=>{
    e.persist();
    await this.setState({busqueda: e.target.value});
    this.filtrarElementos();
  }

  asignarColumnas=()=>{

    const columnas = [
      {
        name: 'ID',
        selector: 'id',
        sortable: true
      },
      {
        name: 'Nombre',
        selector: 'Nombre',
        sortable: true
      },
      {
        name: 'Album',
        selector: 'Album',
        sortable: true,
        grow: 3
      },
      {
        name: 'Artista',
        selector: 'Artista',
        sortable: true,
        grow: 3
        //right:true
      },
  
      {
        name: 'Año',
        selector: 'Año',
        sortable: true,
        grow: 3
        //right:true
      },
  
      {
        name: 'Genero',
        selector: 'Genero',
        sortable: true,
        //grow: 3
        //right:true
      },

      {
        name: 'Link',
        selector: 'link',
        sortable: true,
        grow:3
        //right:true
      }
  
    ];
  
    this.setState({columnas: columnas});
  }

  filtrarElementos=()=>{
    var search=tablaMusica.filter(item=>{
      if(item.Nombre.toString().includes(this.state.busqueda) ||
      item.Album.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").includes(this.state.busqueda) ||
      item.Artista.toLowerCase().includes(this.state.busqueda) ||
      item.Año.toLowerCase().includes(this.state.busqueda)  ||
      item.Genero.toLowerCase().includes(this.state.busqueda)
      ){
        return item;
      }
    });
    this.setState({musica: search});
  }

  crearIndex=()=>{
    var contador=1;
    tablaMusica.map(elemento=>{
      elemento["id"]=contador;
      contador++;
    })
  }

  componentDidMount(){
    this.crearIndex();
    this.asignarColumnas();
this.setState({musica: tablaMusica});
  }
  
  


render(){  
  return (
     <div className="App">
       <Navbar />
      <div className="table-responsive">
      <div className="barraBusqueda">
            <input
              type="text"
              placeholder="Buscar"
              className="textField"
              name="busqueda"
              value={this.state.busqueda}
              onChange={this.onChange}
            />
            <button type="button" className="btnBuscar" /*onClick={onClear}*/>
              {" "}
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
      <DataTable 
      columns={this.state.columnas}
      data={this.state.musica}
      title="Canciones"
      pagination
      paginationComponentOptions={paginacionOpciones}
      fixedHeader
      fixedHeaderScrollHeight="600px"
      noDataComponent={<span>No se encontró ningún elemento</span>}
      />
    </div>
     </div>
    
    
  );
}
}

export default App;