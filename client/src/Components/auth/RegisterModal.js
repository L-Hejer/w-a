import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert,
} from 'reactstrap';
import { registerUser } from '../../js/Actions/authActions';

const RegisterModal = () => {
  const dispatch = useDispatch();
  let history = useHistory();

  const isAuth = useSelector((state) => state.authReducer.isAuth);
  const error = useSelector((state) => state.errorReducer);

  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);

  const toggle = () => {
    setModal(!modal);
  };

  useEffect(() => {
    if (error.id === 'REGISTER_FAIL') {
      setMsg(error.msg.map((el) => el.msg));
    } else {
      setMsg(null);
    }

    // If authenticated => Close Modal
    if (modal) {
      if (isAuth) {
        toggle();
      }
    }
  }, [error, modal, isAuth, toggle]);

  const handleRegister = () => {
    const newUser = { name, lastName, email, password };
    dispatch(registerUser(newUser));
    history.push('/dashboard');
    setName('');
    setLastName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div style={{ padding: '0 15px' }}>
      <NavLink onClick={toggle} href="#">
        Register
      </NavLink>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Register</ModalHeader>
        <ModalBody>
          {/*   {msg ? <Alert color="danger">{msg}</Alert> : null} */}
          <Form>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                value={name}
                name="name"
                id="name"
                placeholder="Name"
                className="mb-3"
                onChange={(e) => setName(e.target.value)}
              />
              <Label for="name">Last Name</Label>
              <Input
                type="text"
                value={lastName}
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                className="mb-3"
                onChange={(e) => setLastName(e.target.value)}
              />
              <Label for="email">Email</Label>
              <Input
                type="email"
                value={email}
                name="email"
                id="email"
                placeholder="email"
                className="mb-3"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Label for="password">Password</Label>
              <Input
                type="password"
                value={password}
                name="password"
                id="password"
                placeholder="Password"
                className="mb-3"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                color="dark"
                style={{ marginTop: '2rem' }}
                block
                onClick={handleRegister}
              >
                Register
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default RegisterModal;
