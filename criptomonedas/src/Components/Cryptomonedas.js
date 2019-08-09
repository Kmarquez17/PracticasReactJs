import React from 'react'

const Cryptomonedas = ({ cryptomonedas}) => {
    const { FullName, Name} = cryptomonedas.CoinInfo
    return ( 
        <option value={Name}>{FullName}</option>
     );
}
 
export default Cryptomonedas;