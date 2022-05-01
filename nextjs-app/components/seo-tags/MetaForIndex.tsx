import Head from 'next/head'
import React from 'react'

const MetaForIndex = () => {
  return (
    <Head>
      {/* https://www.searchenginejournal.com/important-tags-seo/156440/#close */}
      <title>Helpify - Din støtte til gymnasiet</title>
      <meta charSet="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <meta name="HandheldFriendly" content="True" />
      <meta name="MobileOptimized" content="320" />
      <meta name="viewport" content="width=device-width,minimum-scale=1" />
      <link rel="canonical" href="https://helpify.shop" />

      <meta name="description" content="Helpify har designet IT-værktøjer til at hjælpe dig med dine gymnasielle uddannelse i Danmark. IT-værktøjerne er specielt designet til at hjælpe dig med specifikke emner indenfor naturfagene" />
      <meta name="image" content="https://www.helpify.shop/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhelpify.fb4c2630.png&w=256&q=75" />

      <meta property="og:title" content="helpify.shop" />
      <meta property="og:type" content="product.group" />
      <meta property="og:url" content="helpify.shop" />
      <meta property="og:image" content="https://www.helpify.shop/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhelpify.fb4c2630.png&w=256&q=75" />
      <meta property="og:description" content="Description..." />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@helpify" />
      <meta name="twitter:title" content="Helpify.shop" />
      <meta name="twitter:description" content="Description..." />
      <meta name="twitter:image" content="https://www.helpify.shop/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhelpify.fb4c2630.png&w=256&q=75" />
    </Head>
  )
}

export default MetaForIndex