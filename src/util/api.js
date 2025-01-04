import axios from 'axios';
const url = "http://localhost:3000";
// const url = "https://seyahat-rehberligi-back.vercel.app";

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
export async function sehirOlustur(token, ad, resim, video, kesfedinResim, kesfedinAciklama, kesfedinMetin, hissetResim, hissetAciklama, hissetMetin, lezzetResim, lezzetAciklama, lezzetMetin) {
  try {
    const body = { ad, resim, video, kesfedinResim, kesfedinAciklama, kesfedinMetin, hissetResim, hissetAciklama, hissetMetin, lezzetResim, lezzetAciklama, lezzetMetin };
    const options = { headers: { token, } }
    const response = await axios.post(`${url}/sehir`, body, options);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function sehirGetir(sehirId) {
  try {
    const response = await axios.get(`${url}/sehir/${sehirId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function sehirleriGetir() {
  try {
    const response = await axios.get(`${url}/sehir`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function sehirGuncelle(token, sehirId, ad, resim, video, kesfedinResim, kesfedinAciklama, kesfedinMetin, hissetResim, hissetAciklama, hissetMetin, lezzetResim, lezzetAciklama, lezzetMetin) {
  try {
    const body = { ad, resim, video, kesfedinResim, kesfedinAciklama, kesfedinMetin, hissetResim, hissetAciklama, hissetMetin, lezzetResim, lezzetAciklama, lezzetMetin};
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





// ================== TECRUBE ==================
// ================== TECRUBE ==================
export async function tecrubeOlustur(token, ad, resim) {
  try {
    const body = { ad, resim};
    const options = { headers: { token, } }
    const response = await axios.post(`${url}/tecrube`, body, options);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function tecrubeGetir(tecrubeId) {
  try {
    const response = await axios.get(`${url}/tecrube/${tecrubeId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function tecrubeleriGetir() {
  try {
    const response = await axios.get(`${url}/tecrube`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function tecrubeGuncelle(token, tecrubeId, ad, resim) {
  try {
    const body = { ad, resim};
    const options = { headers: { token, } }
    const response = await axios.patch(`${url}/tecrube/${tecrubeId}`, body, options);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function tecrubeSil(token, tecrubeId) {
  try {
    const options = { headers: { token, } }
    const response = await axios.delete(`${url}/tecrube/${tecrubeId}`, options);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
// ================== TECRUBE ==================
// ================== TECRUBE ==================