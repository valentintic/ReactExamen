import React, { Component } from 'react'
import Global from './Global'
import { Navigate } from 'react-router-dom'
import axios from 'axios'

export default class CrearPersonaje extends Component {

    state = {
        status: false,
        series: []
    }

    cajaNombre = React.createRef()
    cajaImagen = React.createRef()
    cajaIdSerie = React.createRef()

    loadSeries = () => {
        let request = "/api/Series"
        let url = Global.urlGlobal + request

        axios.get(url).then(response => {
            this.setState({
                series: response.data
            })
        })
    }

    crearPersonaje = (e) => {
        e.preventDefault()

        let request = "api/personajes"
        let url = Global.urlGlobal + request

        let personaje = new Object()
            personaje.idPersonaje = 0
            personaje.nombre= this.cajaNombre.current.value,
            personaje.imagen= this.cajaImagen.current.value,
            personaje.idSerie= parseInt(this.cajaIdSerie.current.value)
        console.log(personaje)

        axios.post(url, personaje).then(response => {
            console.log(response)
            this.setState({
                status: true
            })
        })
    }

    componentDidMount() {
        this.loadSeries()
    }

  render() {
    if (this.state.status === true) {
        return (
            <Navigate to={"/"}></Navigate>
        )
    }
    return (
      <>
        <h1>Crear Personaje</h1>
        <form>
                    <div className="form-group mb-3">
                        <label htmlFor="nombrePersonaje">Introducir Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            ref={this.cajaNombre}
                            id="nombrePersonaje"
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="imagenPersonaje">Introducir Imagen</label>
                        <input
                            type="text"
                            className="form-control"
                            ref={this.cajaImagen}
                            id="imagenPersonaje"
                        />
                    </div>
                    <div className="form-group mb-3">
                        <select name="" id="" ref={this.cajaIdSerie}>
                            {this.state.series && this.state.series.map((serie, index ) => {
                                return (
                                    <option key={index} value={serie.idSerie}>{serie.nombre}</option>
                                )
                            })}
                        </select>
                        
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={this.crearPersonaje}>Crear</button>
                </form>
      </>
    )
  }
}
