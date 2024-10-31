import SignHeader from './SignHeader'
import Header from './Header'
import { getItemFromLS } from '../../Functions/getItemFromLS';
import style from '../../assets/CSS/User/Headers.module.css'

export default function Headers() {
    const loginData = getItemFromLS("loginData");
    

  return (
    <div className={style.headers}>
          {loginData.length === 0 ? <SignHeader /> : null}
          <Header />
    </div>
  )
}
