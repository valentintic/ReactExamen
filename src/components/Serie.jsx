import React, { Component } from 'react'
import Global from './Global'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

export default class Serie extends Component {
    state = {
        serie: null,
    }

    loadSerie = () => {
        let id = this.props.id
        let request = "api/series/" + id
        let url = Global.urlGlobal + request

        axios.get(url).then(response => {
            this.setState({
                serie: response.data
            })
        })
    }

    componentDidMount() {
        this.loadSerie()
    }

    componentDidUpdate(oldProps) {
        if ( oldProps.id != this.props.id) {
            this.loadSerie()
        }
    }
  render() {
    return (
      <>
        {this.state.serie && (
            <div className='card card-body align-items-center'>
                <img style={{width:"200px", height:"200px", maxHeight:"200px", maxWidth:"200px"}} className='' src={this.state.serie.imagen} alt="" />
                <div className='card-body'>
                    <h1 className='card-title fs-4'>{this.state.serie.nombre}</h1>
                    <h2 className='card-subtitle mb-2 text-muted fs-5'>{this.state.serie.puntuacion}</h2>
                    <h2 className='card-subtitle mb-4 text-muted fs-6'>{this.state.serie.año}</h2>
                    <NavLink to={"/personajes/" + this.state.serie.idSerie} className='btn btn-success'>Personajes</NavLink>
                </div>
            </div>
        )}
      </>
    )
  }
}
