import React, {useState, useEffect, useContext} from 'react';
import {useHttp} from '../hooks/http.hook';
import {AuthContext} from '../context/AuthContext';
import {useHistory} from 'react-router-dom';

export const CreatePage = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const http = useHttp();
    const [link, setLink] = useState('');   
    useEffect(() => window.M.updateTextFields(), []);
    const pressHandler = async evt => {
        if (evt.key === 'Enter') {
            try {
                const data = await http.request('/api/link/generate', 'POST', {from: link},  {
                  Authorization: `Bearer ${auth.token}`
                });
                history.push(`/detail/${data.link._id}`);
            } catch (e) {}
        }
    }
    return (
        <div className='row'>
            <div className='col s8 offset-s2' style={{paddingTop: '2rem'}}>
                <div className='input-field'>
                    <input
                        placeholder='Вставьте ссылку'
                        id="link"
                        type="text"
                        onChange={e => setLink(e.target.value)}
                        onKeyPress={pressHandler}/>
                        <label htmlFor="password">Введите ссылку и нажмите Enter</label>
                </div>
            </div>

        </div>
    )
}