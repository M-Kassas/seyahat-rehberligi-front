import axios from 'axios';
// const url = "http://localhost:3000";
const url = "https://seyahat-rehberligi-back.vercel.app";

// ================== KULLANICI ==================
// ================== KULLANICI ==================
export async function login(kullaniciadi, sifre) {
  try {
    const body = { kullaniciadi, sifre };
    const response = await axios.post(`${url}/kullanici/giris`, body);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function signup(ad, soyad, kullaniciadi, sifre) {
  try {
    const body = { ad, soyad, kullaniciadi, sifre };
    const response = await axios.post(`${url}/kullanici`, body);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function kullaniciGuncelle(token, ad, soyad, sifre) {
  try {
    const body = { ad, soyad, sifre};
    const options = { headers: { token, } }
    const response = await axios.patch(`${url}/kullanici`, body, options);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
// ================== KULLANICI ==================
// ================== KULLANICI ==================





// ================== SEHIR ==================
// ================== SEHIR ==================
export async function sehirOlustur(token, ad, resim, video) {
  try {
    const body = { ad, resim, video };
    const options = { headers: { token, } }
    const response = await axios.post(`${url}/sehir`, body, options);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function sehirleriGetir(token) {
  try {
    const response = await axios.get(`${url}/sehir`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function sehirGuncelle(token, sehirId, ad, resim, video) {
  try {
    const body = { ad, resim, video};
    const options = { headers: { token, } }
    const response = await axios.patch(`${url}/sehir/${sehirId}`, body, options);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function sehirSil(token, sehirId) {
  try {
    const options = { headers: { token, } }
    const response = await axios.delete(`${url}/sehir/${sehirId}`, options);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
// ================== SEHIR ==================
// ================== SEHIR ==================





// ================== SINAV ==================
// ================== SINAV ==================
export async function sinavlariGetir(token) {
  try {
    const options = { headers: { token, } }
    const response = await axios.get(`${url}/sinav`, options);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function sinavOlustur(token, kategori) {
  try {
    const body = { kategori };
    const options = { headers: { token, } }
    const response = await axios.post(`${url}/sinav`, body, options);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function sinavBitir(token, sinavId, soruCevap) {
  try {
    const body = { soruCevap };
    const options = { headers: { token, } }
    const response = await axios.post(`${url}/sinav/${sinavId}`, body, options);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
// ================== SINAV ==================
// ================== SINAV ==================