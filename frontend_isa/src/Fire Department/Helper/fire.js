import axios from "axios"

export const createCertificate = async (details) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/fire/register`,
    {details},
    {}
  );
};

export const getCertificate = async (certid) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/fire/getcertificate`,
    {certid},
    {}
  );
};

export const updateCertificate = async (details) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/fire/updatefirecert`,
    {details},
    {}
  );
};






