import React, { useState, useEffect } from 'react';
import StoreContext, { defaultStoreContext } from './store'
import { useHistory } from 'react-router';

const Provider = ({ children }) => {

    const history = useHistory();
    const [store, updateStore] = useState(defaultStoreContext)
    
    useEffect(() => {
        const changePage = () => {
            var pathname = window.location.pathname;
            updateStore(state => {
                return { ...state, pathName: pathname }
            })
          };
        changePage();
    }, [200])
    
    const setPathName =()=> {
        var pathname = window.location.pathname;
        updateStore(state => {
            return { ...state, pathName: pathname }
        })
    }
    const setFilter =(obj)=> {
        updateStore(state => {
            return { ...state, filter: obj }
        })
    }
    // const changeHistory=(path)=>{
    //     history.push(path);
    // }

    return (
        <StoreContext.Provider
            value={{
                store,
                setPathName,
                setFilter,
                history
            }}>
            {children}
        </StoreContext.Provider>
    );
};

export default Provider;