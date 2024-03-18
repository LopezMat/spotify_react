import React, { useState } from 'react'
import CustomInput from '../../../components/CustomInput'
import ButtonLoader from '../../../components/Loader/ButtonLoader'
import { useAuthContext } from '../../../contexts/AuthContext'
import { USER_INFOS } from '../../../constants/appConstant'
import { checkUser } from '../../../services/userService'
import { useNavigate } from 'react-router-dom'

const EditInfo = () => {

	const navigate = useNavigate();

	//on recupère les info du user
	const { userId, email, nickname, signOut } = useAuthContext();

	const [nicknameValue, setNicknameValue] = useState(nickname);
	const [emailValue, setEmailValue] = useState(email);
	const [passwordValue, setPasswordValue] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const handleSubmit = async (event) => {
		event.preventDefault() //empêche le fonctionnement par défaut du formulaire
		try {
			//on verifie que le user est le bon 
			const userInfo = JSON.parse(localStorage.getItem(USER_INFOS));
			const userValid = await checkUser(userInfo);

			if (userValid) {
				//on vérifie que tous les champs sont remplis
				if (emailValue.length > 0 && nicknameValue.length > 0 && passwordValue.length > 0) {
					//on se créer un tableau pour verifier le mots de passe (checkPassword)
					const dataCheck = {
						id: userId,
						password: passwordValue,
					}

					//on créer un objet pour le patch (on ne prendra pas le mots de passe)
					const data = {
						email: emailValue,
						nickname: nicknameValue
					}

					const headers = {
						'Content-Type': 'application/json',
						'Accept': 'application/json'
					}

				} else {
					setError('Veuillez remplir tous les champs')
					return;
				}

			} else {
				//on déconnecte le user
				signOut();
				//on redirige vers la page de connexion
				navigate('/');
			}
		} catch (error) {

		}

	}

	return (
		<>
			<div className='flex flex-1 flex-col h-screen justify-start items-center bg-black'>
				<h2 className='text-white font-bold text-xl py-5'>Modifiez mes informations</h2>
				<div className="text-red-600 font-bold mb-4">{error}</div>
				<form onSubmit={handleSubmit} className='max-w-md mx-auto'>
					{/* input pour nickname */}
					<CustomInput
						state={nicknameValue}
						label="Mon pseudo"
						type="text"
						callable={(event) => setNicknameValue(event.target.value)}
					/>
					{/* input pour email */}
					<CustomInput
						state={emailValue}
						label="Mon email"
						type="email"
						callable={(event) => setEmailValue(event.target.value)}
					/>
					{/* input pour password */}
					<CustomInput
						state={passwordValue}
						label="Mon mot de passe"
						type="password"
						callable={(event) => setPasswordValue(event.target.value)}
					/>
					<div className='flex items-center justify-center pt-5'>
						{isLoading ? <ButtonLoader /> :
							<button type='submit' className='bg-green hover:bg-green_top text-white font-bold py-2 px-4 rounded'>
								Modifier mon profil
							</button>}
					</div>

				</form>
			</div>
		</>
	)
}

export default EditInfo