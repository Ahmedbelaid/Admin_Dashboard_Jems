// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Card } from 'reactstrap'

// ** Table Import
import Table from './Table'

const Permissions = () => {
  return (
    <Fragment>
      <h3>Permissions List</h3>
      <p>The list below includes the five predefined roles as shown, Administrator, Manger, user and restricted user .</p>
      <Card>
        <div className='card-datatable app-user-list table-responsive'>
          <Table />
        </div>
      </Card>
    </Fragment>
  )
}

export default Permissions
