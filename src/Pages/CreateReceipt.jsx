import {useEffect, useRef} from "react";
import {useMe} from "../Components/UserProvider";
import {useAuth} from "../auth";
import {repeat} from "../Utils/Repeater";
import {ReactComponent as Plus} from "../Icons/plus.svg";
import {UberForm} from "../Components/UberForm";
import {Input} from "../Components/Input";
import {UserSelector} from "../Components/UserSelector";
import {BACKEND} from "../consts";
import {authHeader} from "../Utils/AuthHeader";
import {useNavigate} from "react-router-dom";


export function CreateReceipt(){
    const [auth] = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        auth();
    }, []);

    const form = useRef(null);

    return <div className={"w-full desktop:w-[60%] m-auto mt-[100px] pl-2 pr-2"}>
        <UberForm ref={form}>
            <div className={"w-full desktop:w-[450px] m-auto"}>
                <Input placeholder={"Название"} className={"mb-6"} name={"name"}/>
                <UserSelector className={"mb-6"} name={"users"}/>
                <div className={"button accent text-[24px] w-[80%] m-auto text-center"} onClick={()=>{
                    const code = auth();

                    if (!code)
                        return;

                    const f = form.current.finalize();

                    fetch(`${BACKEND}/event/register`, {
                        method: "POST",
                        body: JSON.stringify({
                            event_name: f.name,
                            event_type: "fast",
                            event_members: f.users
                        }), ...authHeader(code)
                    }).then(r => {
                        if (r.ok) {
                            r.json().then(x => navigate(`/events/${x}`));
                        }
                    })
                }}>Создать</div>
            </div>
        </UberForm>
    </div>;
}