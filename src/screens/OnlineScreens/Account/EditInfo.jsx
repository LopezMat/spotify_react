import React, { useState } from 'react'
import CustomInput from '../../../components/CustomInput'
import ButtonLoader from '../../../components/Loader/ButtonLoader'
import { useAuthContext } from '../../../contexts/AuthContext'
import { USER_INFOS } from '../../../constants/appConstant'
import { checkUser } from '../../../services/userService'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { apiRoot, apiUrl } from '../../../constants/apiConstant'

const EditInfo = () => {

	const navigate = useNavigate();

	//on recupère les info du user
	const { userId, email, nickname, signOut, signIn } = useAuthContext();

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
						Accept: 'application/json'
					}

					try {
						//requet qui verifie si le mdp est correct
						const respPassword = await axios.post(`${apiRoot}/check-password`, dataCheck, { headers });
						if (respPassword.data.response) {
							try {
								//requet qui verifie si l'email est deja utiliser
								const respEmail = await axios.get(`${apiUrl}/users?email=${emailValue}`);
								//TODO: on vas verifier des trucs en plus 
								if (emailValue !== email && respEmail.data['hydra:member'].length > 0) {
									setError('Cet email est déjà utilisé');
									return;
								} else {
									try {
										//config axios pour la méthode patch
										axios.defaults.headers.patch['Content-Type'] = 'application/merge-patch+json';
										//requet pour modifier l'utilisateur
										const resp = await axios.patch(`${apiUrl}/users/${userId}`, data);
										//on reconstruit l'objet user
										const user = {
											userId: resp.data.id,
											nickname: resp.data.nickname,
											email: resp.data.email
										};
										//mise a jour du context d'authentification
										signIn(user);
										//on redirige vers la page de profil
										navigate(`/account/${userId}`);


									} catch (error) {
										console.log(`Erreur lors de la requête de modification du user: ${error}`)
									}
								}
							} catch (error) {
								console.log(`Erreur lors de la requête de vérification de l'email : ${error}`)
							}
						} else {
							setError('Mot de passe incorrect');
							return;
						}
					} catch (error) {
						console.log(`Erreur lors de la requête de la verification du mot de passe : ${error}`)
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