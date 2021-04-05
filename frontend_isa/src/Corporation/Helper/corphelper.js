import axios from "axios"

export const createCertificate = async (details) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/corporation/register`,
    {details},
    {}
  );
};

export const getelecCertificate = async (certid) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/electricity/getcertificate`,
    {certid},
    {}
  );
};

export const getcorpCertificate = async (certid) => {
    return await axios.post(
      `${process.env.REACT_APP_API}/corporation/getcertificate`,
      {certid},
      {}
    );
  };

export const updateCertificate = async (details) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/corporation/updatecertificate`,
    {details},
    {}
  );
};