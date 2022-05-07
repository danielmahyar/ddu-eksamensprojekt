import Head from 'next/head'
import React from 'react'
const MetaForProduct = ({
  title = 'AmfoLabs Calculator',
  description = 'Din kemi hjælp til eksamen',
  image = 'https://www.helpify.shop/amfolabs-logo.svg',
}) => {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href={"/amfoico.ico"}/>
      <meta title="AmfoLabs Calculator for Students" />
      <meta charSet="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <meta name="HandheldFriendly" content="True" />
      <meta name="MobileOptimized" content="320" />
      <meta name="viewport" content="width=device-width,minimum-scale=1" />
      <meta name="robots" content="index, follow" /> 

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@daniel_dev" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <link rel="canonical" href="https://helpify.shop/" />
      <meta name="twitter:image" content={image} />

      <meta property="og:type" content="product" />
      <meta property="og:image" content={image} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content="https://www.helpify.shop/products/amfolabs" />
      <meta property="og:site_name" content="Helpify" />


    </Head>
  )
}

export default MetaForProduct