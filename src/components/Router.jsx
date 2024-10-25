import React, { Component } from 'react'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import Home from "./Home"
import MenuRutas from './MenuRutas'
import Serie from './Serie'
import Personajes from './Personajes'
import CrearPersonaje from './CrearPersonaje'
import UpdatePersonaje from './UpdatePersonaje'

function SerieElement() {
  let {idSerie} = useParams()

  return <Serie id = {idSerie}/>
}

function PersonajesElement() {
  let {idSerie} = useParams()

  return <Personajes id = {idSerie}/>
}


export default class Router extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
        <MenuRutas></MenuRutas>
            <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/serie/:idSerie' element={<SerieElement/>}></Route>
                <Route path='/personajes/:idSerie' element={<PersonajesElement/>}></Route>
                <Route path='/crearpersonaje' element={<CrearPersonaje/>}></Route>
                <Route path='/updatepersonajes' element={<UpdatePersonaje/>}></Route>
            </Routes>
        </BrowserRouter>
      </>
    )
  }
}
