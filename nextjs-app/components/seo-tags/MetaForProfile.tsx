import Head from 'next/head'
import React from 'react'

const MetaForProfile = ({ title }: any) => {
	return (
		<Head>
			<title>{title}</title>
			<link rel="icon" href={"/favicon.ico"} />
			<meta title="Profile Page" />
		</Head >
	)
}

export default MetaForProfile