import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';

function App() {

  const dataPaquete = [
    { id: 1, nombre: "Audifonos", cantidad: 241 },
    { id: 2, nombre: "Zapatos Nike", cantidad: 225 },
  ];

  const [data, setData] = useState(dataPaquete);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);

  const [PaqueteSeleccionado, setPSeleccionado] = useState({
    id: '',
    nombre: '',
    cantidad: ''
  });

  const seleccionarPaquete=(elemento, caso)=>{
    setPSeleccionado(elemento);
(caso==='Editar')?setModalEditar(true):setModalEliminar(true)
  }

  const handleChange=e=>{
    const {name, value}=e.target;
    setPSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }));
  }

  const editar=()=>{
    var dataNueva=data;
    dataNueva.map(pais=>{
      if(pais.id===PaqueteSeleccionado.id){
        pais.cantidad=PaqueteSeleccionado.cantidad;
        pais.nombre=PaqueteSeleccionado.nombre;
      }
    });
    setData(dataNueva);
    setModalEditar(false);
  }

  const eliminar =()=>{
    setData(data.filter(pais=>pais.id!==PaqueteSeleccionado.id));
    setModalEliminar(false);
  }

  const abrirModalInsertar=()=>{
    setPSeleccionado(null);
    setModalInsertar(true);
  }

  const insertar =()=>{
    var valorInsertar=PaqueteSeleccionado;
    valorInsertar.id=data[data.length-1].id+1;
    var dataNueva = data;
    dataNueva.push(valorInsertar);
    setData(dataNueva);
    setModalInsertar(false);
  }

  return (
    <div className="App">
      <h2>lsitado de paquetes de amazon</h2>
      <br />
    <button className="btn btn-success" onClick={()=>abrirModalInsertar()}>Insertar</button>
    <br /><br />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(elemento=>(
            <tr>
              <td>{elemento.id}</td>
              <td>{elemento.nombre}</td>
              <td>{elemento.cantidad}</td>
              <td><button className="btn btn-primary" onClick={()=>seleccionarPaquete(elemento, 'Editar')}>Editar</button> {"   "} 
              <button className="btn btn-danger" onClick={()=>seleccionarPaquete(elemento, 'Eliminar')}>Eliminar</button></td>
            </tr>
          ))
          }
        </tbody>
      </table>

      <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar paquete</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={PaqueteSeleccionado && PaqueteSeleccionado.id}
            />
            <br />

            <label>paquete</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={PaqueteSeleccionado && PaqueteSeleccionado.nombre}
              onChange={handleChange}
            />
            <br />

            <label>cantidad</label>
            <input
              className="form-control"
              type="text"
              name="cantidad"
              value={PaqueteSeleccionado && PaqueteSeleccionado.cantidad}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>editar()}>
            Actualizar
          </button>
          <button
            className="btn btn-danger"
            onClick={()=>setModalEditar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>


      <Modal isOpen={modalEliminar}>
        <ModalBody>
          Estás Seguro que deseas eliminar el paquete {PaqueteSeleccionado && PaqueteSeleccionado.nombre}
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>eliminar()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={()=>setModalEliminar(false)}
          >
            No
          </button>
        </ModalFooter>
      </Modal>


        <Modal isOpen={modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Insertar paquete</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={data[data.length-1].id+1}
            />
            <br />

            <label>Paquete</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={PaqueteSeleccionado ? PaqueteSeleccionado.nombre: ''}
              onChange={handleChange}
            />
            <br />

            <label>cantidad</label>
            <input
              className="form-control"
              type="text"
              name="cantidad"
              value={PaqueteSeleccionado ? PaqueteSeleccionado.cantidad: ''}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary"
          onClick={()=>insertar()}>
            Insertar
          </button>
          <button
            className="btn btn-danger"
            onClick={()=>setModalInsertar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
