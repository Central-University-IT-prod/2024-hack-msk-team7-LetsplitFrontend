import {useMe} from "./UserProvider";
import {ReactComponent as Receipt} from "../Icons/receipt.svg";
import {ReactComponent as User} from "../Icons/user.svg";
import {ReactComponent as Enter} from "../Icons/enter.svg";
import {useEffect} from "react";



export function Navbar() {
    const [me] = useMe();

    return <div className={"w-full h-fit mb-[30px] bg-[black] bg-opacity-15 sticky flex justify-between p-5"}>
        <a className={"button-raw"} href={"/receipts"}>
            <Receipt className={"inline-block align-middle fill-accent w-[52px] h-[52px]"}/>
            <div className={"inline align-middle text-[32px] desktop"}> Чеки</div>
        </a>
        <a className={"button-raw h-full text-[32px] text-center"} href={"/"}>Let<b className={"inline text-accent"}>S</b>plit</a>
        {
            me ? <a className={"button-raw"} href={`/me`}>
                <User className={"inline-block align-middle fill-accent w-[52px] h-[52px]"}/>
                <div className={"inline align-middle text-[32px] desktop"}> {me.visible_name}</div>
            </a> : <a className={"button-raw"} href={"/login"}>
                <Enter className={"inline-block align-middle fill-accent w-[52px] h-[52px]"}/>
                <div className={"inline align-middle text-[32px] desktop"}> Войти</div>
            </a>
        }
    </div>
}