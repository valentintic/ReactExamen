import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Global from './Global'
import axios from 'axios'

export default class MenuRutas extends Component {

  state = {
    series: []
  }

  loadSeries = () => {
    let request = "/api/Series"
    let url = Global.urlGlobal + request

    axios.get(url).then(response => {
      this.setState({
        series: response.data
      })
    } )
  }

  componentDidMount() {
    this.loadSeries()
  }
  render() {
    return (
      <>
      <div>
            <nav className="navbar navbar-expand-xl navbar-dark bg-dark" aria-label="Third navbar example">
              <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarsExample03">
                  <ul className="navbar-nav me-auto mb-2 mb-sm-0">
                    <li className="nav-item">
                      <a className="nav-link active" aria-current="page" href="/">Home</a>
                    </li>

                    <li>
                      <NavLink to={"/crearpersonaje"} className={"nav-link"} >Nuevo Personaje</NavLink>
                    </li>

                    <li>
                      <NavLink to={"/updatepersonajes"} className={"nav-link"} >Modificar Personajes</NavLink>
                    </li>

                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Series</a>
                      <ul className="dropdown-menu bg-dark">
                        {this.state.series && this.state.series.map((serie, index) => {
                          return (
                            <li key={index}>
                              <NavLink to={"/serie/" + serie.idSerie} className={"text-whit nav-link"}>{serie.nombre}</NavLink>
                            </li>
                          )
                        })}
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
        </div>
      </>
    )
  }
}
