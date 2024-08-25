import React from 'react'
import { Button } from '../../../components/ui/button'

export default function AppButton({name}) {
  return (
    <Button
    className='bg-blue-700'
    >
        {name}
    </Button>
  )
}
