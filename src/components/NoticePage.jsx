import React, { useEffect, useState } from 'react'
import { Row, Col, Form, InputGroup, Button, Table } from 'react-bootstrap'
import moment from 'moment'
import { app } from '../firebaseInit'
import { getFirestore, collection, addDoc, doc, deleteDoc } from 'firebase/firestore'
import { query, orderBy, limit, where, onSnapshot } from 'firebase/firestore'

const NoticePage = () => {
    const db = getFirestore(app);
    const [text, setText] = useState('');
    const email = sessionStorage.getItem('email');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const onSend = async(e) => {
        e.preventDefault();
        const date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        await addDoc(collection(db, 'notice'), {email:email, text:text, date:date} );
        setText('');
    }

    const getMessages = () => {
        setLoading(true);
        const q=query(collection(db, 'notice'),orderBy('date','desc'), where('date','>','2023'), limit(100));
        onSnapshot(q, (snapshot)=>{
            let rows=[];
            snapshot.forEach(row=>{
                rows.push({ id: row.id, ...row.data() });
            });
            setMessages(rows);
            setLoading(false);
        });
    }

    const onDelete = async(id) => {
        if(!window.confirm(id + '번 메시지를 삭제하실래요?')) return;
        await deleteDoc(doc(db, 'notice', id));
    }

    useEffect(()=>{
        getMessages();    
    }, []);
   
    if(loading) return <h1 className='text-center my-5'>로딩중......</h1>
    return (
        <Row className='my-5'>
            <Col>
                <h1 className='text-center mb-5'>알림</h1>
                <Form onSubmit={ onSend }>
                    <InputGroup>
                        <Form.Control placeholder='내용입력'
                            value={ text } onChange={ (e)=>setText(e.target.value) }/>
                        <Button type="submit">전송</Button>
                    </InputGroup>
                </Form>
                <Table style={{fontSize:'0.8rem'}} className='mt-5'>
                    <thead>
                        <tr>
                            <td>메시지</td>
                            <td width={200}>보낸날</td>
                            <td width={150}>보낸이</td>
                            <td width={100}>삭제</td>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.map(msg=>
                        <tr key={msg.id}>
                            <td>{msg.text}</td>    
                            <td>{msg.date}</td>
                            <td>{msg.email}</td>
                            <td>{msg.email===email && 
                                <Button className='btn-sm'
                                    onClick={()=>onDelete(msg.id)}>삭제</Button>}</td>
                        </tr>
                        )}
                    </tbody>
                </Table>
            </Col>
        </Row>
    )
}

export default NoticePage