import React, {useState, useEffect, Fragment} from "react";
import { useRouter } from 'next/router';
import Head from 'next/head'
import styles from "../../styles/Details.module.css";
import Link from "next/link";


const Details = () => {
  const {query: {id}} = useRouter();
  const [pokemon, setPokemon] = useState({})

  useEffect(()=>{

    const getPokemon = async () =>{
      await fetch(`https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setPokemon(data)})
    }
    if(id){
        getPokemon();
    }


  },[id])

  if(!pokemon.name){
    return <h1>Loading...</h1>
  }else {
    return (
        <Fragment>
          <Head>
            <title>{pokemon.name}</title>
          </Head>
          <div>
            <Link href="/">
              <a>Back to Home</a>
            </Link>
          </div>
          <div className={styles.layout}>
            <div>
              <img
                className={styles.picture}
                src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
                alt={pokemon.name}
              />
            </div>
            <div>
              <div className={styles.name}>{pokemon.name}</div>
              <div className={styles.type}>{pokemon.type && pokemon.type.join(', ')}</div>
              <table>
                <thead className={styles.header}>
                  <tr>
                    <th>Name</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {pokemon.stats && pokemon.stats.map(({ name, value }) => (
                    <tr key={name}>
                      <td className={styles.attribute}>{name}</td>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Fragment>
        
      )
  }

    

  
}

export default Details; 