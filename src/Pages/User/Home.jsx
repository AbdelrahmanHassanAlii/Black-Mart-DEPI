import SignHeader from "../../Components/User/SignHeader";
import { getItemFromLS } from './../../Functions/getItemFromLS';

export default function Home() {
  const loginData = getItemFromLS('loginData');
  return (
    <>
      {loginData.length !== 0 ? <SignHeader /> : null}
    </>
  );
}

