import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation, gql } from '@apollo/client';
import React from 'react';


// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Label,
  Input,
  Table,
  Modal,
  Button,
  CardBody,
  ModalBody,
  ModalHeader,
  FormFeedback,
  UncontrolledTooltip
} from 'reactstrap'

// ** Third Party Components
import { Copy, Info } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'

// ** Custom Components
import AvatarGroup from '@components/avatar-group'

// ** FAQ Illustrations
import illustration from '@src/assets/images/illustration/faq-illustrations.svg'

// ** Avatars
import avatar1 from '@src/assets/images/avatars/1.png'
import avatar2 from '@src/assets/images/avatars/2.png'
import avatar3 from '@src/assets/images/avatars/3.png'
import avatar4 from '@src/assets/images/avatars/4.png'
import avatar5 from '@src/assets/images/avatars/5.png'
import avatar6 from '@src/assets/images/avatars/6.png'
import avatar7 from '@src/assets/images/avatars/7.png'
import avatar8 from '@src/assets/images/avatars/8.png'
import avatar9 from '@src/assets/images/avatars/9.png'
import avatar10 from '@src/assets/images/avatars/10.png'
import avatar11 from '@src/assets/images/avatars/11.png'
import avatar12 from '@src/assets/images/avatars/12.png'


const ADD_ROLE = gql`
  mutation CreateRole($input: CreateRoleInput!) {
    createRole(input: $input) {
      id
      roleName
      permissions
    }
  }
`;
// ** Vars
const data = [
  {
    totalUsers: 4,
    title: 'Administrator',
    users: [
      {
        size: 'sm',
        title: 'Vinnie Mostowy',
        img: avatar2
      },
      {
        size: 'sm',
        title: 'Allen Rieske',
        img: avatar12
      },
      {
        size: 'sm',
        title: 'Julee Rossignol',
        img: avatar6
      },
      {
        size: 'sm',
        title: 'Kaith Dsouza',
        img: avatar11
      }
    ]
  },
  {
    totalUsers: 7,
    title: 'Manager',
    users: [
      {
        size: 'sm',
        title: 'Jimmy Ressula',
        img: avatar4
      },
      {
        size: 'sm',
        title: 'John Doe',
        img: avatar1
      },
      {
        size: 'sm',
        title: 'Kristi Lawker',
        img: avatar2
      },
      {
        size: 'sm',
        title: 'Kaith D',
        img: avatar5
      },
      {
        size: 'sm',
        title: 'Danny Paul',
        img: avatar7
      }
    ]
  },
  {
    totalUsers: 5,
    title: 'Users',
    users: [
      {
        size: 'sm',
        title: 'Andrew Tye',
        img: avatar6
      },
      {
        size: 'sm',
        title: 'Rishi Swaat',
        img: avatar9
      },
      {
        size: 'sm',
        title: 'Rossie Kim',
        img: avatar2
      },
      {
        size: 'sm',
        title: 'Kim Merchent',
        img: avatar10
      },
      {
        size: 'sm',
        title: 'Sam Dsouza',
        img: avatar8
      }
    ]
  },
  {
    totalUsers: 3,
    title: 'Support',
    users: [
      {
        size: 'sm',
        title: 'Kim Karlos',
        img: avatar3
      },
      {
        size: 'sm',
        title: 'Katy Turner',
        img: avatar9
      },
      {
        size: 'sm',
        title: 'Peter Adward',
        img: avatar12
      },
      {
        size: 'sm',
        title: 'Kaith Dsouza',
        img: avatar10
      },
      {
        size: 'sm',
        title: 'John Parker',
        img: avatar11
      }
    ]
  },
  {
    totalUsers: 2,
    title: 'Restricted User',
    users: [
      {
        size: 'sm',
        title: 'Kim Merchent',
        img: avatar10
      },
      {
        size: 'sm',
        title: 'Sam Dsouza',
        img: avatar6
      },
      {
        size: 'sm',
        title: 'Nurvi Karlos',
        img: avatar3
      },
      {
        size: 'sm',
        title: 'Andrew Tye',
        img: avatar8
      },
      {
        size: 'sm',
        title: 'Rossie Kim',
        img: avatar9
      }
    ]
  }
]

const rolesArr = [
  'User Management',
  'Content Management',
  'Disputes Management',
  'Database Management',
  'Financial Management',
  'Reporting',
  'API Control',
  'Repository Management',
  'Payroll'
]

const RoleCards = () => {
  const [show, setShow] = React.useState(false);
  const [modalType, setModalType] = React.useState('Add New');
  const [roleName, setRoleName] = React.useState('');
  const [selectedPermissions, setSelectedPermissions] = React.useState([]);

  const [createRole] = useMutation(ADD_ROLE);

    const handleModalClosed = () => {
    setModalType('Add New');
    setRoleName('');
    setSelectedPermissions([]);
    setShow(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await createRole({
        variables: {
          input: {
            name: roleName, // Pass roleName
            permissionIds: selectedPermissions, // Pass selectedPermissions
          },
        },
      });

      console.log('Role created:', data.createRole);

      // Optionally, you can update your component's state or perform other actions.
      handleModalClosed();
    } catch (error) {
      console.error('Error creating role:', error);
    }
  };

  return (
    <Fragment>
      <Row>
        {data.map((item, index) => {
          return (
            <Col key={index} xl={4} md={6}>
              <Card>
                <CardBody>
                  <div className='d-flex justify-content-between'>
                    <span>{`Total ${item.totalUsers} users`}</span>
                    <AvatarGroup data={item.users} />
                  </div>
                  <div className='d-flex justify-content-between align-items-end mt-1 pt-25'>
                    <div className='role-heading'>
                      <h4 className='fw-bolder'>{item.title}</h4>
                      <Link
                        to='/'
                        className='role-edit-modal'
                        onClick={e => {
                          e.preventDefault()
                          setModalType('Edit')
                          setShow(true)
                        }}
                      >
                        <small className='fw-bolder'>Edit Role</small>
                      </Link>
                    </div>
                   
                  </div>
                </CardBody>
              </Card>
            </Col>
          )
        })}
        <Col xl={4} md={6}>
          <Card>
            <Row>
              <Col sm={5}>
                <div className='d-flex align-items-end justify-content-center h-100'>
                  <img className='img-fluid mt-2' src={illustration} alt='Image' width={85} />
                </div>
              </Col>
              <Col sm={7}>
                <CardBody className='text-sm-end text-center ps-sm-0'>
                  <Button
                    color='primary'
                    className='text-nowrap mb-1'
                    onClick={() => {
                      setModalType('Add New')
                      setShow(true)
                    }}
                  >
                    Add New Role
                  </Button>
                  <p className='mb-0'>Add a new role here</p>
                </CardBody>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Modal
        isOpen={show}
        onClosed={handleModalClosed}
        toggle={() => setShow(!show)}
        className='modal-dialog-centered modal-lg'
      >
        {/* Your existing modal content here */}
        <form onSubmit={handleSubmit}>
          {/* Role Name input */}
          <Label className='form-label' for='roleName'>
            Role Name
          </Label>
          <Input
            type='text'
            id='roleName'
            placeholder='Enter role name'
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            invalid={!roleName}
          />
          {roleName === '' && <FormFeedback>Please enter a valid role name</FormFeedback>}

          {/* Role Permissions checkboxes */}
          <h4 className='mt-2 pt-50'>Role Permissions</h4>
          <Table className='table-flush-spacing' responsive>
            <tbody>
              {/* Map through your rolesArr and render checkboxes */}
              {rolesArr.map((role, index) => (
                <tr key={index}>
                  <td className='text-nowrap fw-bolder'>{role}</td>
                  <td>
                    <div className='d-flex'>
                      <div className='form-check me-3 me-lg-5'>
                        <Input
                          type='checkbox'
                          id={`read-${role}`}
                          checked={selectedPermissions.includes(`read-${role}`)}
                          onChange={() => {
                            if (selectedPermissions.includes(`read-${role}`)) {
                              setSelectedPermissions((prevPermissions) =>
                                prevPermissions.filter((p) => p !== `read-${role}`)
                              );
                            } else {
                              setSelectedPermissions((prevPermissions) => [
                                ...prevPermissions,
                                `read-${role}`,
                              ]);
                            }
                          }}
                        />
                        <Label className='form-check-label' for={`read-${role}`}>
                          Read
                        </Label>
                      </div>
                      {/* Similar checkboxes for write and create permissions */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Submit and Discard buttons */}
          <Col className='text-center mt-2' xs={12}>
            <Button type='submit' color='primary' className='me-1'>
              Submit
            </Button>
            <Button type='reset' outline onClick={handleModalClosed}>
              Discard
            </Button>
          </Col>
        </form>
      </Modal>
    </Fragment>
  )
}

export default RoleCards