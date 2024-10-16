import React from 'react'
import { Button } from '../../../components/ui/button'

export default function AppButton({name,onClick,disabled=false}) {
  return (
    <Button
        className='bg-[#226b36] hover:bg-[#4cae68]'
        onClick={onClick}
        disabled={disabled}
    >
        {name}
    </Button>
  )
}
