import { PayButton } from '@paybutton/react'

function App() {
  const to = 'ecash:qzyzah2k2766k7yefv33mlj4a7ewepc9fyzkqu4urv'
  const text = 'Support Devs'
  const successText = 'Much appreciated, thanks!'


  return <PayButton
    to={to}
    text={text}
    successText={successText}
  />
}