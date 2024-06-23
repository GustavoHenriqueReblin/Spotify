import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod"; 
import { z } from "zod";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { User } from "../types";
import Loading from "../components/Loading";
import Button from "../components/Button";

const Login: React.FC = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [submitLoading, setSubmitLoading] = useState<boolean>(false);
	type LoginFormData = z.infer<typeof loginSchema>;
	const submitButtonRef = useRef<HTMLButtonElement | null>(null);

	const loginSchema = z.object({
		login: z.string().email({ message: "E-mail inválido!" }),
		password: z.string().min(1, { message: "Campo obrigatório!" }),
	});

	const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	});

	const navigate = useNavigate();

	const handleLogin = async (data: LoginFormData) => {
		setSubmitLoading(true);
		if (submitButtonRef.current) {
			submitButtonRef.current.disabled = true;
		}

		const res = await fetch((process.env.REACT_APP_SERVER_URL ?? "") + "/login", {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data)
		});

		const user = await res.json() as User[];
		if (user && user.length > 0) {
			Cookies.set(process.env.REACT_APP_AUTH_COOKIE_NAME ?? "", user[0].token ?? "");
			navigate("/", { replace: true });
		} else {
			setSubmitLoading(false);
			if (submitButtonRef.current) {
				submitButtonRef.current.disabled = false;
			}

			toast.error("Usuário não encontrado!", {
				position: "top-center",
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: false,
				progress: undefined,
				theme: "colored",
			});
		}
	};

	useEffect(() => {
		const token = Cookies.get(process.env.REACT_APP_AUTH_COOKIE_NAME ?? "");
		if (token) navigate("/", { replace: true });
		setLoading(false);
	}, [navigate]);

	if (loading) return <Loading />;

	return (
		<form onSubmit={handleSubmit(handleLogin)}>
			<ToastContainer
				position="top-center"
				autoClose={3000}
				hideProgressBar={true}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				theme="colored"
			/>
			<main className="w-full h-screen flex items-center justify-center lg:p-16 p-0 gap-8">
				<section className="h-full lg:w-1/2 w-full rounded-md bg-zinc-800 flex flex-col items-center justify-center p-8 gap-6 relative">
					<h2 className="text-2xl font-bold">Entrar no Spotify</h2>
					<div className="flex flex-col gap-2 lg:w-96 w-full">
						<span className="text-md font-semibold">E-mail</span>
						<input type="text" {...register("login", { required: true })} placeholder="Seu e-mail" className="h-12 rounded-md bg-zinc-900 border-solid border border-zinc-700 p-4 text-md"></input>
						{errors.login && <span className='text-sm text-red-400'>{errors.login.message}</span>}
					</div>
					<div className="flex flex-col gap-2 lg:w-96 w-full">
						<span className="text-md font-semibold">Senha</span>
						<input type="password" {...register("password", { required: true })} placeholder="Sua senha" className="h-12 rounded-md bg-zinc-900 border-solid border border-zinc-700 p-4 text-md"></input>
						{errors.password && <span className='text-sm text-red-400'>{errors.password.message}</span>}
					</div>
					<Button text="Entrar" loading={submitLoading} ref={submitButtonRef} />
				</section>
				<section className="h-full w-2/5 rounded-md bg-zinc-800 lg:flex hidden flex-col items-center p-8 relative">
					<img alt="banner1" src={require('../assets/banner.png')} className="rounded-lg h-fit" />
					<img alt="banner2" src={require('../assets/banner2.jpg')} className="rounded-lg h-3/5 absolute top-1/3" />
				</section>
			</main>
		</form>
	);
}

export default Login;