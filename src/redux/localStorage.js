
export const saveState = (store) => {
    
    try{
        const serializedStore = JSON.stringify(store);
        localStorage.setItem('store',serializedStore)
    } catch(e) {
        console.log(e)
    }
};

export const loadState = () => {
    try{
        const serializedStore = localStorage.getItem('store');
        if(serializedStore === null){
            return undefined
        }
        return JSON.parse(serializedStore)
    } catch(e){
        console.log(e);
        return undefined
    }
};

export const deleteState = () => {
    try{
        console.log('loooogout')
        localStorage.removeItem('store');
        console.log('logged out')
    }catch(e){
        console.log(e);
        return undefined
    }
};