import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router-dom';
import {useGetUser} from '../../hooks/useGetUser';
import {useEffect, useState} from "react";
import {useUpdateUser} from "../../hooks/useUpdateUser.jsx";

function EditProfile() {
  const {t} = useTranslation();
  const {id} = useParams();
  const {user} = useGetUser(id);
  const [about, setAbout] = useState('');
  const [gender, setGender] = useState('');
  const [charCount, setCharCount] = useState(0);
  const maxLength = 120;
  const { saveUser, isLoading, error } = useUpdateUser();

  useEffect(() => {
    if (user) {
      setAbout(user.about || ''); // Inicializa con `user.about` si está disponible
      setGender(user.gender || ''); // Inicializa con `user.gender` si está disponible
      setCharCount((user.about || '').length);
    }
  }, [user]);

  const handleAboutChange = (e) => {
    setAbout(e.target.value);
    setCharCount(e.target.value.length);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleSave = async () => {
    try {
      const updatedFields = {
        about,
        gender,
      };

      const updatedUser = await saveUser(id, updatedFields, "PATCH");
      console.log('User updated:', updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <>
      <div className="m-5 bg-custom-100 flex p-2 rounded-xl align-middle">
        <div className="w-1/4">
          <img
            className='h-auto w-20 m-auto bg-white rounded-full'
            src={'/img/users/' + user.picture}
            alt={user.name}
          />
        </div>
        <div className='w-3/4'>
          <div className='flex w-full text-left pl-5'>
            <h2 className='text-xl font-bold text-custom-350'>
              {user.name} {user.lastname}
            </h2>
          </div>
          <div className='flex w-full text-left pl-5 mb-3'>
            <div className='mr-1'>
              <button className='text-sm bg-custom-250 text-white px-1 rounded'>{t('change')} {t('personalInformation')}</button>
            </div>
            <div className='mr-1'>
              <button className='text-sm bg-custom-250 text-white px-1 rounded'>{t('change')} {t('picture')}</button>
            </div>
          </div>
        </div>
      </div>
      <div className="p-2 m-5">
        <label className='mb-4 block text-custom-350'>
          {t('description')}
        </label>
        <div className="relative">
          <textarea
            className="w-full rounded-lg border-2 border-custom-250 p-2 placeholder-custom-250 font-normal text-base text-custom-250 focus:border-custom-350 focus:outline-none"
            rows={3}
            maxLength={maxLength}
            value={about}
            onChange={handleAboutChange}
          ></textarea>
          <div className="absolute bottom-2 right-2 text-xs text-custom-250">
            {charCount}/{maxLength}
          </div>
        </div>
        <label className='my-4 block text-custom-350'>
          {t('gender')}
        </label>
        <select
          className="w-full max-w-full rounded-lg border-2 border-custom-250 p-2 placeholder-custom-250 font-normal text-base text-custom-250 focus:border-custom-350 focus:outline-none"
          value={gender}
          onChange={handleGenderChange}
        >
          <option value="female">{t('genderOptionsLabel2')}</option>
          <option value="male">{t('genderOptionsLabel1')}</option>
        </select>
        <button className='w-full py-2 bg-custom-250 text-white font-bold rounded-lg mt-4'
                onClick={handleSave}
                disabled={isLoading}
        >
          {t('save')}
        </button>
        {error && <p className="text-red-500 mt-2">{t('saveError')}</p>}
      </div>
    </>
  );
}

export default EditProfile;
