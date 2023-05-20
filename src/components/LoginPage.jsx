import React from 'react'
import { useState } from 'react'
import {Row, Col, Form, InputGroup, Card, Button} from 'react-bootstrap'
import { app } from '../firebaseInit';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import { Link } from 'react-router-dom'
import LoadingPage from './LoadingPage';

const LoginPage = ({history}) => {
    const [loading, setLoading] = useState(false);
    const auth=getAuth(app);
    const [form, setForm] = useState({
        email:'hong@inha.com',
        password:'12345678'
    });
    const {email, password} = form;
    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    }
    const onLogin = () => {
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
        .then(success=>{
            sessionStorage.setItem('uid', success.user.uid);
            sessionStorage.setItem('email', email);
            setLoading(false);
            if(sessionStorage.getItem('target')){
                history.push(sessionStorage.getItem('target'));
            }else{
                history.go(-1);
            }
        })
        .catch(error=>{
            alert('에러:' + error.message);
            setLoading(false);
        });
    }

    if(loading) return <LoadingPage/>
    return (
        <Row className='justify-content-center my-5'>
            <Col md={6}>
                <h1 className='text-center'>로그인</h1>
                <Card className='p-3'>
                    <Form>
                        <InputGroup className='my-2'>
                            <InputGroup.Text>이 메 일</InputGroup.Text>
                            <Form.Control value={email}
                                onChange={onChange} name="email"/>
                        </InputGroup>
                        <InputGroup className='my-2'>
                            <InputGroup.Text>비밀번호</InputGroup.Text>
                            <Form.Control 
                                onChange={onChange} name="password"
                                value={password} type="password"/>
                        </InputGroup>
                        <Button 
                            onClick={onLogin}
                            className='w-100 mt-3'>로그인</Button>
                        <div className='text-end my-2'>
                            <Link to="/join">회원가입</Link>
                        </div>    
                    </Form>
                </Card>
            </Col>
        </Row>
    )
}

export default LoginPage