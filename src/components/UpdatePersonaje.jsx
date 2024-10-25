import React, { Component } from 'react'
import Global from './Global'
import axios from 'axios'
import { Navigate } from 'react-router-dom'

export default class UpdatePersonaje extends Component {

    state = {
        personajes: [],
        series: [],
        status: false,
        personajeSeleccionado: null,
        serieSeleccionada: null,
    }
    cajaIdPersonaje = React.createRef()
    cajaIdSerie = React.createRef()

    loadPersonajes = () => {
        let request = "api/personajes"
        let url = Global.urlGlobal + request

        axios.get(url).then(response => {
            this.setState({
                personajes: response.data
            })
        })
    }

    loadSeries = () => {
        let request = "api/series"
        let url = Global.urlGlobal + request

        axios.get(url).then(response => {
            this.setState({
                series:response.data
            })
        })
    }

    cambiarImagenes = (e) => {
        e.preventDefault()
        let personajeSeleccionado = this.state.personajes.find(personaje => personaje.idPersonaje == this.cajaIdPersonaje.current.value)
        let serieSeleccionada = this.state.series.find(serie => serie.idSerie == this.cajaIdSerie.current.value)

        this.setState({
            personajeSeleccionado: personajeSeleccionado,
            serieSeleccionada: serieSeleccionada,
        })
        
    }

    cambiarPersonajes = (e) => {
        e.preventDefault()
        let idPersonaje = this.cajaIdPersonaje.current.value
        let idSerie = this.cajaIdSerie.current.value
        let request = "/api/Personajes/" + idPersonaje + "/" + idSerie
        let url = Global.urlGlobal + request

        axios.put(url).then(response => {
            console.log(response)
            this.setState({
                status:true,
            })
        })
    }

    componentDidMount() {
        this.loadPersonajes()
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
      {this.state.personajes && this.state.series && (
        <div className='text-center'>
            <h1>Personajes y Series</h1>
        <form action="" className='form' onChange={this.cambiarImagenes}>
            <div>
                <label htmlFor="">Seleccionar Serie</label><br />
                <select name="" id="" className='form form-select-sm' ref={this.cajaIdSerie}>
                    {this.state.series.map((serie, index) =>{
                        return (
                            <option value={serie.idSerie} key={index}>{serie.nombre}</option>
                        )
                    })}
                </select>
            </div>
            <div className='form form-group'>
                <label htmlFor="">Seleccionar Personaje</label><br />
                <select name="" id="" className='form form-select-sm' ref={this.cajaIdPersonaje} >
                    {this.state.personajes.map((personaje, index) =>{
                        return (
                            <option text={personaje.nombre} value={personaje.idPersonaje} key={index}>{personaje.nombre}</option>
                        )
                    })}
                </select>
            </div>

            <button className='btn btn-primary' onClick={this.cambiarPersonajes}>Actualizar Personaje</button>
        </form>
            {this.state.personajeSeleccionado && this.state.serieSeleccionada && (
                <div>
                    <h1>{this.state.serieSeleccionada.nombre}</h1>
                    <img style={{width:"200px", height:"200px"}} src={this.state.serieSeleccionada.imagen}></img>
                    <h1>{this.state.personajeSeleccionado.nombre}</h1>
                    <img  style={{width:"200px", height:"200px"}} src={this.state.personajeSeleccionado.imagen} alt="" />
                </div>
            )}

        </div>
      )}
      </>
    )
  }
}
