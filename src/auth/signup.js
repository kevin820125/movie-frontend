import React, { useState } from "react";
import { useHistory} from "react-router-dom";
import './signup.css'
import { Form,Container, Button , Col} from "react-bootstrap";


const SignUpForm = ({signup}) =>{
    const history = useHistory();
    let initial = {
        username : '',
        password : '',
        email : '',
        photourl : ''
    }

    const [form , setForm] = useState(initial)
    const [error , setError] = useState('')
    const handleChange = (e) => {
        const {name , value} = e.target;
        setForm(form => (
            {
                ...form,
                [name] : value
            }
        ))
    }


    async function handleSubmit (e){
        e.preventDefault();
        const res = await signup({...form})
        if(res.success){
            history.push('/')
        }else{
            setError('invalid username/email form')
        }
    }


    return(
        <Container fluid = 'sm' className ='registerContainer'>
        <Form onSubmit = {handleSubmit}>
            <Col>
        <Form.Group>
            <Form.Label>UserName</Form.Label>
            <Form.Control type="text" placeholder="UserName..." onChange={handleChange}  value = {form.username} type = 'text' id = 'username' name = 'username'/>
        </Form.Group>
             </Col>

             <Col>
        <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password..."  onChange={handleChange} value = {form.password}  type = 'password' id = 'password' name = 'password'/>
        </Form.Group>
            </Col>
            <Col>
        <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Email..."  onChange={handleChange}  value = {form.email} type = 'text' id = 'email' name = 'email'/>
            <Form.Text className="text">
            We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group>
            </Col>
            <Col>
        <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="photoUrl..."  onChange={handleChange} value = {form.photourl}  type = 'text' id = 'photourl' name = 'photourl'/>
        </Form.Group>
        </Col>
        <Col>
        <Button variant="primary" type="submit">
            Submit
        </Button>
        </Col>
        </Form>
        <Col classname ='error'>{error ? <p classname ='error'>{error}</p> : null}</Col>
        </Container>
    )
}


export default SignUpForm;