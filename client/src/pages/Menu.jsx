import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const Menu = () => {

  const [menus, setMenus] = useState();
  useEffect(() => {
    fetch('http://localhost:8080/api/menu')
      .then(data => data.json())
      .then(data => {
        console.log(data)
        setMenus(data)
      })
  }, [])

  return (
    menus?.items?.map((item, index) => (
      <section key={index}>
        <h1>{item.fields.name}</h1>
        <p>{item.fields.description}</p>
      </section>
    ))
  )
}

export default Menu