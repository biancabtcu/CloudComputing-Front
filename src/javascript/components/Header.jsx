import React from 'react';

function Header(props) {

    const {title} = props;
    return ( 
        <header id="Header" className='h-14 bg-lime-700 flex justify-center '>
           <span className='text-white text-bold text-xl self-center'>
           {title}
           </span> 
        </header>
        
       
     );
}

export default Header;