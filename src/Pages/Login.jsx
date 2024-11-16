import {useRef, useState} from "react";
import {UberForm} from "../Components/UberForm";
import {Input} from "../Components/Input";
import {setTitlePage} from "../title";
import {useAuth} from "../auth";
import {BACKEND} from "../consts";
import {generateRandomString, UPPERCASE_ENGLISH_LETTERS} from "../Utils/StringGen";
import {useNavigate} from "react-router-dom";

export function Login() {
    setTitlePage("Вход");

    const [auth, onAuth] = useAuth();

    const nav = useNavigate();

    const [guest, setGuest] = useState(true)

    const ch = <div className={"button-raw text-[24px] text-center mt-[50px] h-[50px]"}
                    onClick={() => setGuest(x => !x)}>{guest ? "Обратно" : "Гостевой режим"}</div>;

    return <>

        {
            guest ? <LoginGuest/> : <LoginRegular/>
        }

    </>

    function login(username, password) {
        fetch(`${BACKEND}/user/login`, {
            method: "POST",
            body: getFormData({username, password}),
            headers: {'content-type': 'application/x-www-form-urlencoded'}
        }).then(r => {
            if (r.ok)
                r.json().then(code => {
                    localStorage.setItem("auth_code", code["access_token"]);
                    onAuth("/");
                    nav("/me");
                });
        });
    }

    function getFormData(object) {
        const form = [];
        Object.entries(object).forEach(e => form.push(`${e[0]}=${e[1]}`));
        return form.join('&');
    }

    function LoginRegular() {
        const form = useRef(null);

        return <div className={"w-full desktop:w-[60%] m-auto mt-[100px] pl-2 pr-2"}>
            <div className={"w-full desktop:w-[450px] m-auto"}>
                <UberForm ref={form}>
                    <Input required placeholder={"Отображаемое имя"} className={"mb-6"} name={"visibleName"}/>
                    <Input required placeholder={"Имя пользователя"} className={"mb-6"} name={"username"}
                           promiseVerifications={[
                               (value) => fetch(`${BACKEND}/user/exists/${value}`).then(x => {
                                   if (x.status === 404) {
                                       return null;
                                   } else {
                                       return "Имя занято";
                                   }
                               })
                           ]}
                    />
                    <Input required name={"password"} type={"password"} className={"mb-2"} placeholder={"Пароль"}
                           pattern={"^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_]).{8,}$"}
                           errorMessage={"Ненадёжный пароль!\nПароль должен содержать больше 8 символов\nИметь одну строчную и заглавную латинскую\nИметь цифру и спец-символ"}/>

                    <div className={"button accent text-[24px] w-[80%] m-auto text-center"} onClick={() => {
                        if (!form.current.valid())
                            return;
                        const f = form.current.finalize();

                        fetch(`${BACKEND}/user/exists/${f.username}`).then(x => {
                            if (x.status === 404) {
                                fetch(`${BACKEND}/user/register`, {
                                    method: "POST",
                                    body: JSON.stringify(f),
                                    headers: {'content-type': 'application/json'},
                                }).then(r => {
                                    if (r.ok) {
                                        login(f.username, f.password);
                                    }
                                });
                            } else {
                                login(f.username, f.password);
                            }
                        })
                    }}>Войти
                    </div>
                </UberForm>
            </div>
        </div>;
    }

    function LoginGuest() {
        const form = useRef(null);

        return <div className={"w-full desktop:w-[60%] m-auto mt-[100px] pl-2 pr-2"}>
            <div className={"w-full desktop:w-[450px] m-auto"}>
                <UberForm ref={form}>
                    <Input required placeholder={"Имя гостя"} className={"mb-6"} name={"visibleName"}/>
                    <div className={"button accent text-[24px] w-[80%] m-auto text-center"} onClick={() => {
                        if (!form.current.valid())
                            return;
                        const f = {
                            ...form.current.finalize(),
                            username: generateRandomString(4, UPPERCASE_ENGLISH_LETTERS),
                            password: generateRandomString(20)
                        }

                        fetch(`${BACKEND}/user/register`, {
                            method: "POST",
                            body: JSON.stringify(f),
                            headers: {'content-type': 'application/json'},
                        }).then(r => {
                            if (r.ok) {
                                login(f.username, f.password);
                            }
                        });
                    }}>Войти
                    </div>
                </UberForm>
            </div>
        </div>
            ;
    }
}