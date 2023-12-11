import style from './ErrorPage.module.css'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {

  const navigate = useNavigate()

  const backToHome = () => {
    navigate('/dashboard')
  }

  return (
    <div className={style.container}>
      <div className={style.errorPage_content}>
        <div className={style.text_container}>
            <p ><span className={style.custom_font}>404</span><br /> Page Not Found</p>
            <p className={style.message_font}> Sorry, but it seems that the page you're looking for doesn't exist. 
                Please check the URL or navigate back to our homepage. 
                If you believe this is an error.</p>
            <Button onClick={backToHome}>Back To Home Page</Button>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
