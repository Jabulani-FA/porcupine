import React from 'react'

const TodoButtons = ({ added, filtered, setadded, setfiltered }) => {
  return (
    <div className='row mb-2'>
        <div className='col d-flex justify-content-center'>
            <button className={added?'btn btn-raised btn-primary':'btn btn-raised btn-success'} onClick={() => setadded(!added)}>{added ? 'click to Add' : 'show Todos'}</button>
        </div>
        {added && <div className='col d-flex justify-content-center'>
            <button onClick={() => setfiltered(!filtered)} className='btn btn-raised btn-primary'>filter</button>
        </div>}
    </div>
  )
}

export default TodoButtons