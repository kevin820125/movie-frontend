import React, { useState } from "react";
import { useHistory} from "react-router-dom";
import { Form,Container, Button , Col} from "react-bootstrap";

const LoginForm = ({login}) =>{
    const history = useHistory();
    const initial = {
        username : '',
        password : ''
    }
    const [form , setForm] = useState(initial)
    const [error , setError] = useState('')

    const handleChange = (e) =>{
        const {name , value} = e.target;
        setForm(form => (
            {
                ...form,
                [name] : value
            }
        ))
    }

    async function handleSubmit(e){
        e.preventDefault();
        const result = await login({...form})
        if(result.success === true){
            history.push('/')
        }else{
            setError('username/password Invalid')
        }
    }

    return(
        <Container fluid = 'sm' className ='registerContainer'>

        <Form onSubmit = {handleSubmit}>
            <Col>
        <Form.Group >
            <Form.Label>UserName</Form.Label>
            <Form.Control type="text" placeholder="UserName..." onChange={handleChange}  value = {form.username} type = 'text' id = 'username' name = 'username'/>
        </Form.Group>
             </Col>

             <Col>
        <Form.Group >
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password..."  onChange={handleChange} value = {form.password}  type = 'password' id = 'password' name = 'password'/>
        </Form.Group>
            </Col>
            <Col>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Col>
            <Col>
            {error ? <p className='error'>{error}</p> : null}
            </Col>
        </Form>
        </Container>
    )









}


export default LoginForm;