import { useState } from 'react';
import './App.css';
import RouterPage from './components/RouterPage';
import any from './images/any.jpg'
import {Container} from 'react-bootstrap'
import BoxModal from './components/BoxModal';
import { BoxContext } from './components/BoxContext';

function App() {
    const [ box, setBox] = useState({
        show: false,
        message: '',
        action: null
    });

    return (
        <BoxContext.Provider value={{ box, setBox }}>
            <Container className="App">
                <img src={any} width="100%"/>
                <RouterPage/>
                { box.show && <BoxModal box={ box }/>}
            </Container>
        </BoxContext.Provider>
    );
}

export default App;