import React, { useState, useEffect} from 'react'

const useLocalStorage = localStorageKey => {
     const [value, setValue] = React.useState(
       localStorage.getItem(localStorageKey) || ''
     );
   
     React.useEffect(() => {
       localStorage.setItem(localStorageKey, value);
     }, [value]);
   
     return [value, setValue];
   };

   export default useLocalStorage;