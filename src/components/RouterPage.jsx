import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, Route, Switch, withRouter } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import HomePage from './HomePage';
import BookPage from './BookPage';
import LocalPage from './LocalPage';
import LoginPage from './LoginPage';
import JoinPage from './JoinPage';
import MyPage from './MyPage';
import ChatPage from './ChatPage';
import FavoritePage from './FavoritePage';
import NoticePage from './NoticePage';

import { app } from '../firebaseInit'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import moment from 'moment';
import PostsPage from './PostsPage';
import PostInsert from './PostInsert';
import PostRead from './PostRead';
import PostUpdate from './PostUpdate';

const RouterPage = ({ history, location }) => {
    const [count, setCount] = useState(0);
    const uid=sessionStorage.getItem('uid');
    const db = getFirestore(app);
    const onLogout = () => {
        sessionStorage.removeItem('email');
        sessionStorage.clear();
        history.push('/');
    }

    const getCount = async() => {
        const result = await getDoc(doc(db, 'user', uid));
        const read_date = result.data().read_date ? result.data().read_date:'';
        const q=query(collection(db, 'notice'), where('date', '>', read_date));
        onSnapshot(q, (snapshot)=>{
            setCount(snapshot.docs.length);
            //console.log('count...', snapshot.docs.length);
        });
    }

    useEffect(()=>{
        if(uid) getCount();
    }, [uid]);

    useEffect(()=> {
        return async()=>{
            if(location.pathname==='/notice') {
                const result=await getDoc(doc(db, 'user', uid));
                const read_date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
                await setDoc(doc(db, 'user', uid), {...result.data(), read_date:read_date });
                //console.log('readDate', read_date);
                setCount(0);
            }
        }
    }, [location]);

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="/books">LOGO</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-3 my-lg-0"
                            style={{ maxHeight: '100%' }}
                            navbarScroll>
                            <Link to="/">Home</Link>
                            <Link to="/book">도서검색</Link>
                            <Link to="/local">지역검색</Link>
                            <Link to="/posts">게시글</Link>
                            {sessionStorage.getItem('email') &&
                            <>
                                <Link to="/favorite">즐겨찾기</Link>
                            </>
                            }
                        </Nav>
                        <div>
                            {sessionStorage.getItem('email') ?
                                <>
                                    <Link to="/mypage">
                                        {sessionStorage.getItem('email')}
                                    </Link>
                                    <Link
                                        onClick={onLogout} 
                                        to="#">로그아웃</Link>
                                </>
                                :
                                <Link to="/login">로그인</Link>
                            }
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Switch>
                <Route path="/" component={HomePage} exact={true}/>
                <Route path="/book" component={BookPage}/> 
                <Route path="/local" component={LocalPage}/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/join" component={JoinPage}/>
                <Route path="/mypage" component={MyPage}/>
                <Route path="/chat" component={ChatPage}/>
                <Route path="/favorite" component={FavoritePage}/>
                <Route path="/notice" component={NoticePage}/>
                <Route path="/posts" component={PostsPage} exact={true}/>
                <Route path="/posts/insert" component={PostInsert}/>
                <Route path="/posts/read/:id" component={PostRead}/>
                <Route path="/posts/update/:id" component={PostUpdate}/>
            </Switch>
        </>
    )
}

export default withRouter(RouterPage)