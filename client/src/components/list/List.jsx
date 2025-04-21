import React from 'react'
import "./list.scss"
import { listData } from '../../lib/dummyData'
import Card from '../card/Card'

function List({posts}) {
  
  return (
    <div className='list'>
        {posts.map((item) => (
            <Card item={item} key={item.id}/>
        ))}
    </div>
  )
}

export default List