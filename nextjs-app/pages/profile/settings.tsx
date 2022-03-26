import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

const Settings: NextPage = () => {
	const router = useRouter()
	const { id } = router.query

	return (
		<div>settings for {id}</div>
	)
}

export default Settings