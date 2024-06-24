import React from 'react'

interface HeaderProps {
    logo: string
}

const Header: React.FC<HeaderProps> = ({
    logo,
}) => {
  return (
    <div className='w-full bg-white justify-start pl-16 py-1'>
        <img src={logo} alt={'logo'} />
    </div>
  )
}

export default Header