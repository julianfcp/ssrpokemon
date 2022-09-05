import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, {useState, useEffect} from "react";
import Link from 'next/link';


export async function getServerSideProps(){
  const resp = await fetch("https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json");
  console.log("En el servidor!")
  return {
    props: {
      pokemons: await resp.json(),
    }
  }
}




export default function Home({pokemons}) {

  /* const [pokemons, setPokemons] = useState()

  useEffect(()=>{

    const getPokemons = async () =>{
      await fetch("https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json")
            .then((res) => res.json())
            .then((data) => setPokemons(data))
    }
    getPokemons();


  },[]) */



  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon List</title> 
      </Head>
      <div className={styles.grid}>
      {pokemons && pokemons.map((el) => {
        return (
            <div className={styles.card} key={el.id}>
              <Link href={`/pokemon/${el.id}`}>
                <a>
                  <img
                    src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${el.image}`}
                    alt={el.name}
                  />
                  <h3>{el.name} </h3>
                </a>
              </Link>
            </div>
        )
      })}
      </div>

    </div>
  )
}
