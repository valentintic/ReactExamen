import React, { Component } from 'react'
import Global from './Global'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

export default class Personajes extends Component {
    state = {
      personajes: [],
    }

    loadPersonajes = () => {
      let id = this.props.id
      let request = "api/personajes/" + id
      let url = Global.urlGlobal + request
      
      axios.get(url).then(response => {
        console.log(response.data)
        this.setState({
          personajes: [response.data]
        })
      }).catch(error => {
        console.log(error)
      })
    }

    componentDidMount() {
      this.loadPersonajes()
    }

    componentDidUpdate(oldprops) {
      if (oldprops.id !== this.props.id) {
        this.loadPersonajes()
      }
    }

    // "idPersonaje": 0,
    // "nombre": "string",
    // "imagen": "string",
    // "idSerie": 0
  render() {
    return (
      <>
      <h1 className='text-center bg-dark text-white'>Personajes</h1>
        {this.state.personajes && <div>
          <table className='table table-dark'>
            <thead>
              <tr>
                <th>idPersonaje</th>
                <th>nombre</th>
                <th>imagen</th>
                <th>idSerie</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.personajes.map((personaje, index) => {
                  return (
                    <tr key={index}>
                      <td>{personaje.idPersonaje}</td>
                      <td>{personaje.nombre}</td>
                      <td><img src={personaje.imagen} alt="" /></td>
                      <td>{personaje.idSerie}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          <NavLink className={"btn btn-danger"} to={"/serie/" + this.props.id}>Volver a serie</NavLink>
          </div>
          }
      </>
    )
  }
}
