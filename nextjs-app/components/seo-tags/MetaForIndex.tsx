import Head from 'next/head'
import React from 'react'

const MetaForIndex = () => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <meta name="HandheldFriendly" content="True" />
      <meta name="MobileOptimized" content="320" />
      <meta name="viewport" content="width=device-width,minimum-scale=1" />
      <link rel="canonical" href="https://fireship.io/" />

      <meta name="description" content="Description..." />
      <meta name="image" content="https://fireship.io/img/covers/default.png" />

      <meta property="og:title" content="Helpify.dk" />
      <meta property="og:type" content="product.group" />
      <meta property="og:url" content="vocastproduction.studio" />
      <meta property="og:image" content="https://fireship.io/img/covers/default.png" />
      <meta property="og:description" content="Description..." />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@helpify" />
      <meta name="twitter:title" content="Helpify.dk" />
      <meta name="twitter:description" content="Description..." />
      <meta name="twitter:image" content="https://fireship.io/img/covers/default.png" />
    </Head>
  )
}

export default MetaForIndex