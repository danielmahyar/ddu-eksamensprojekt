import Head from 'next/head'
import React from 'react'
const MetaForProduct = ({
  title = 'AmfoLabs Calculator',
  description = 'Din personlige hjælper til din eksamen',
  image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfxNgsuE1wET71jqCNfvgL4DesBe_kVpfa-J6opKWRNcV14DTkAHxLvQoc2bZ-YfF2Rso&usqp=CAU',
}) => {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href={"/amfoico.ico"}/>
      <meta title="AmfoLabs Calculator for Students" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@daniel_dev" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
  )
}

export default MetaForProduct