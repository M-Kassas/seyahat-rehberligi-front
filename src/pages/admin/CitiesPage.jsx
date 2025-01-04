import { useContext, useEffect, useState } from 'react';
import classes from './Page.module.css'
import { ReactContext } from '../../context/ReactContext';
import PageLabel from '../../components/PageLabel';
import LoadingState from '../../components/LoadingState';
import ErrorState from '../../components/ErrorState';
import Button from '../../components/Button';

export default function() {
  const ctx = useContext(ReactContext);

  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(''); 
  
  const [openCreateOverlay, setOpenCreateOverlay] = useState(false);
  const [openUpdateOverlay, setOpenUpdateOverlay] = useState(false); 
  const [actionLoading, setActionLoading] = useState(false); 
  const [refresh, setRefresh] = useState(0); 
 
  const [sehirler, setSehirler] = useState([]);
  
  const [ad, setAd] = useState('');
  const [resim, setResim] = useState('');
  const [video, setVideo] = useState(''); 
  
  const [updateId, setUpdateId] = useState('');
  const [actionError, setActionError] = useState('');

  const [kesfedinResim, setKesfedinResim] = useState("");
  const [kesfedinAciklama, setKesfedinAciklama] = useState("");
  const [kesfedinMetin, setKesfedinMetin] = useState("");
  const [hissetResim, setHissetResim] = useState("");
  const [hissetAciklama, setHissetAciklama] = useState("");
  const [hissetMetin, setHissetMetin] = useState("");
  const [lezzetResim, setLezzetResim] = useState("");
  const [lezzetAciklama, setLezzetAciklama] = useState("");
  const [lezzetMetin, setLezzetMetin] = useState("");


  useEffect(() => {
    (async function() {
      setLoading(true);
      setError('');

      const response = await ctx.api.sehirleriGetir(ctx.user.token);
      if (response.error) {
        setError(response.errorMsg);
      } else {
        setSehirler(response.sehirler);
      }
      setLoading(false);
    })();
  }, [refresh])

  async function deleteAction(id) {
    setActionLoading(true);
    const response = await ctx.api.sehirSil(ctx.user.token, id);
    if (response.error) {
      setError(response.errorMsg);
    } else {
      setRefresh(Math.random());
    }
    setActionLoading(false);
  }

  async function sehirOlustur() {
    setActionLoading(true);
    const response = await ctx.api.sehirOlustur(ctx.user.token, ad, resim, video, kesfedinResim, kesfedinAciklama, kesfedinMetin, hissetResim, hissetAciklama, hissetMetin, lezzetResim, lezzetAciklama, lezzetMetin);
    if (response.error) {
      setActionError(response.errorMsg);
    } else {
      setOpenCreateOverlay(false);
      clearActionForm();
      setRefresh(Math.random());
    }
    setActionLoading(false);
  }

  async function sehirGuncelle() {
    setActionLoading(true);
    const response = await ctx.api.sehirGuncelle(ctx.user.token, updateId, ad, resim, video, kesfedinResim, kesfedinAciklama, kesfedinMetin, hissetResim, hissetAciklama, hissetMetin, lezzetResim, lezzetAciklama, lezzetMetin);
    if (response.error) {
      setActionError(response.errorMsg);
    } else {
      setOpenUpdateOverlay(false);
      clearActionForm();
      setRefresh(Math.random());
    }
    setActionLoading(false);
  }

  function clearActionForm() {
    setAd("");
    setResim("");
    setVideo("");
    
    setActionError([]);
    setUpdateId('');
  }

  function prepareUpdate(id, ad, resim, video) {
    setUpdateId(id);

    setAd(ad);
    setResim(resim);
    setVideo(video);
    
    setOpenUpdateOverlay(true);
  }

  function resimSec(e) {
    if (e.target.files.length > 0) {
      const fr = new FileReader();
      fr.onload = function () {
        setResim(fr.result);
      }
      fr.readAsDataURL(e.target.files[0]);
    }
  }

  function kesfedinResimSec(e) {
    if (e.target.files.length > 0) {
      const fr = new FileReader();
      fr.onload = function () {
        setKesfedinResim(fr.result);
      }
      fr.readAsDataURL(e.target.files[0]);
    }
  }

  function hissetResimSec(e) {
    if (e.target.files.length > 0) {
      const fr = new FileReader();
      fr.onload = function () {
        setHissetResim(fr.result);
      }
      fr.readAsDataURL(e.target.files[0]);
    }
  }

  function lezzetResimSec(e) {
    if (e.target.files.length > 0) {
      const fr = new FileReader();
      fr.onload = function () {
        setLezzetResim(fr.result);
      }
      fr.readAsDataURL(e.target.files[0]);
    }
  }

  return (
    <>
      <div className={classes.layout}>
        <PageLabel label="Şehirler" />
        {
          loading
          ? <LoadingState />
          : error.length > 0
            ? <ErrorState msg={error} />
            : <>
                <div>
                  <Button label="+ Yeni Şehir Ekle" type="Action" disabled={actionLoading} onClick={() => setOpenCreateOverlay(true)} />
                </div>
                <table className={classes.table}>
                  <thead className={classes.tableHeadRow}>
                    <tr>
                      <th>Ad</th>
                      <th>Keşfedin</th>
                      <th>Hisset</th>
                      <th>Lezzet</th>
                      <th className={classes.buttonColumn}>Güncelle</th>
                      <th className={classes.buttonColumn}>Sil</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      sehirler.map(sehir => <tr key={sehir.id} className={classes.tableDataRow}>
                        <td>{sehir.ad}</td>
                        <td>{sehir.kesfedinAciklama}</td>
                        <td>{sehir.hissetAciklama}</td>
                        <td>{sehir.lezzetAciklama}</td>
                        <td><Button label="Güncelle" type="Update" disabled={actionLoading} onClick={() => prepareUpdate(sehir.id, sehir.ad, sehir.resim, sehir.video)}/></td>
                        <td><Button label="Sil" type="Delete" disabled={actionLoading} onClick={() => deleteAction(sehir.id)}/></td>
                      </tr>)
                    }
                  </tbody>
                </table>
              </>
        }
      </div>




      <div className={openCreateOverlay ? classes.overlayOpened : classes.overlayClosed}>
        <form className={classes.form}>
          {actionError.length > 0 && <ErrorState msg={actionError} />}
          <h1 className={classes.formTitle}>Şehir Oluştur</h1>
          <h1 className={classes.formTitle}>Şehir Bİlgileri:</h1>
          <div className={classes.formInputCont}>
            <label className={classes.imageCont} htmlFor="resim">
              <img className={classes.image} src={resim || "https://placehold.co/600x400?text=ŞehirResim"} />
            </label>
            <input style={{display: "none"}} type={"file"} id="resim" name="resim" onChange={resimSec} />
          </div>
          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="ad">Ad:</label>
            <input className={classes.formInput} id="ad" name="ad" value={ad} onChange={(e) => setAd(e.target.value)} />
          </div>
          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="video">Video Link:</label>
            <input className={classes.formInput} id="video" name="video" value={video} onChange={(e) => setVideo(e.target.value)} />
          </div>
          
          <h1 className={classes.formTitle}>Keşfedin:</h1>
          <div className={classes.formInputCont}>
            <label className={classes.imageCont} htmlFor="kesfedinResim">
              <img className={classes.image} src={kesfedinResim || "https://placehold.co/600x400?text=kesfedinResim"} />
            </label>
            <input style={{display: "none"}} type={"file"} id="kesfedinResim" name="kesfedinResim" onChange={kesfedinResimSec} />
          </div>

          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="kesfedinAciklama">Keşfedin Açıklama:</label>
            <input className={classes.formInput} id="kesfedinAciklama" name="kesfedinAciklama" value={kesfedinAciklama} onChange={(e) => setKesfedinAciklama(e.target.value)} />
          </div>

          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="kesfedinMetin">Keşfedin Metin:</label>
            <textarea className={`${classes.formInput} ${classes.formTextarea}`} id="kesfedinMetin" name="kesfedinMetin" value={kesfedinMetin} onChange={(e) => setKesfedinMetin(e.target.value)} />
          </div>

          <h1 className={classes.formTitle}>Hisset:</h1>
          <div className={classes.formInputCont}>
            <label className={classes.imageCont} htmlFor="hissetResim">
              <img className={classes.image} src={hissetResim || "https://placehold.co/600x400?text=hissetResim"} />
            </label>
            <input style={{display: "none"}} type={"file"} id="hissetResim" name="hissetResim" onChange={hissetResimSec} />
          </div>

          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="hissetAciklama">Hisset Açıklama:</label>
            <input className={classes.formInput} id="hissetAciklama" name="hissetAciklama" value={hissetAciklama} onChange={(e) => setHissetAciklama(e.target.value)} />
          </div>

          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="hissetMetin">Hisset Metin:</label>
            <textarea className={`${classes.formInput} ${classes.formTextarea}`} id="hissetMetin" name="hissetMetin" value={hissetMetin} onChange={(e) => setHissetMetin(e.target.value)} />
          </div>

          <h1 className={classes.formTitle}>Lezzet:</h1>
          <div className={classes.formInputCont}>
            <label className={classes.imageCont} htmlFor="lezzetResim">
              <img className={classes.image} src={lezzetResim || "https://placehold.co/600x400?text=lezzetResim"} />
            </label>
            <input style={{display: "none"}} type={"file"} id="lezzetResim" name="lezzetResim" onChange={lezzetResimSec} />
          </div>

          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="lezzetAciklama">Lezzet Açıklama:</label>
            <input className={classes.formInput} id="lezzetAciklama" name="lezzetAciklama" value={lezzetAciklama} onChange={(e) => setLezzetAciklama(e.target.value)} />
          </div>

          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="lezzetMetin">Lezzet Metin:</label>
            <textarea className={`${classes.formInput} ${classes.formTextarea}`} id="lezzetMetin" name="lezzetMetin" value={lezzetMetin} onChange={(e) => setLezzetMetin(e.target.value)} />
          </div>

          <div className={classes.formInputCont}>
            <Button label={actionLoading ? "İşleniyor ..." : "Oluştur"} type="Action" disabled={actionLoading} onClick={sehirOlustur}/>
            <Button label={actionLoading ? "İşleniyor ..." : "İptal"} type="Action" disabled={actionLoading} onClick={() => {setOpenCreateOverlay(false); clearActionForm()} }/>
          </div>
        </form>
      </div>

      <div className={openUpdateOverlay ? classes.overlayOpened : classes.overlayClosed}>
        <form className={classes.form}>
          {actionError.length > 0 && <ErrorState msg={actionError} />}

          <h1 className={classes.formTitle}>Şehir Güncelle</h1>
          <h1 className={classes.formTitle}>Şehir Bİlgileri:</h1>
          <div className={classes.formInputCont}>
            <label className={classes.imageCont} htmlFor="resim">
              <img className={classes.image} src={resim || "https://placehold.co/600x400?text=ŞehirResim"} />
            </label>
            <input style={{display: "none"}} type={"file"} id="resim" name="resim" onChange={resimSec} />
          </div>
          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="ad">Ad:</label>
            <input className={classes.formInput} id="ad" name="ad" value={ad} onChange={(e) => setAd(e.target.value)} />
          </div>
          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="video">Video Link:</label>
            <input className={classes.formInput} id="video" name="video" value={video} onChange={(e) => setVideo(e.target.value)} />
          </div>
          
          <h1 className={classes.formTitle}>Keşfedin:</h1>
          <div className={classes.formInputCont}>
            <label className={classes.imageCont} htmlFor="kesfedinResim">
              <img className={classes.image} src={kesfedinResim || "https://placehold.co/600x400?text=kesfedinResim"} />
            </label>
            <input style={{display: "none"}} type={"file"} id="kesfedinResim" name="kesfedinResim" onChange={kesfedinResimSec} />
          </div>

          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="kesfedinAciklama">Keşfedin Açıklama:</label>
            <input className={classes.formInput} id="kesfedinAciklama" name="kesfedinAciklama" value={kesfedinAciklama} onChange={(e) => setKesfedinAciklama(e.target.value)} />
          </div>

          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="kesfedinMetin">Keşfedin Metin:</label>
            <textarea className={`${classes.formInput} ${classes.formTextarea}`} id="kesfedinMetin" name="kesfedinMetin" value={kesfedinMetin} onChange={(e) => setKesfedinMetin(e.target.value)} />
          </div>

          <h1 className={classes.formTitle}>Hisset:</h1>
          <div className={classes.formInputCont}>
            <label className={classes.imageCont} htmlFor="hissetResim">
              <img className={classes.image} src={hissetResim || "https://placehold.co/600x400?text=hissetResim"} />
            </label>
            <input style={{display: "none"}} type={"file"} id="hissetResim" name="hissetResim" onChange={hissetResimSec} />
          </div>

          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="hissetAciklama">Hisset Açıklama:</label>
            <input className={classes.formInput} id="hissetAciklama" name="hissetAciklama" value={hissetAciklama} onChange={(e) => setHissetAciklama(e.target.value)} />
          </div>

          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="hissetMetin">Hisset Metin:</label>
            <textarea className={`${classes.formInput} ${classes.formTextarea}`} id="hissetMetin" name="hissetMetin" value={hissetMetin} onChange={(e) => setHissetMetin(e.target.value)} />
          </div>

          <h1 className={classes.formTitle}>Lezzet:</h1>
          <div className={classes.formInputCont}>
            <label className={classes.imageCont} htmlFor="lezzetResim">
              <img className={classes.image} src={lezzetResim || "https://placehold.co/600x400?text=lezzetResim"} />
            </label>
            <input style={{display: "none"}} type={"file"} id="lezzetResim" name="lezzetResim" onChange={lezzetResimSec} />
          </div>

          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="lezzetAciklama">Lezzet Açıklama:</label>
            <input className={classes.formInput} id="lezzetAciklama" name="lezzetAciklama" value={lezzetAciklama} onChange={(e) => setLezzetAciklama(e.target.value)} />
          </div>

          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="lezzetMetin">Lezzet Metin:</label>
            <textarea className={`${classes.formInput} ${classes.formTextarea}`} id="lezzetMetin" name="lezzetMetin" value={lezzetMetin} onChange={(e) => setLezzetMetin(e.target.value)} />
          </div>

          <div className={classes.formInputCont}>
            <Button label={actionLoading ? "İşleniyor ..." : "Güncelle"} type="Action" disabled={actionLoading} onClick={sehirGuncelle}/>
            <Button label={actionLoading ? "İşleniyor ..." : "İptal"} type="Action" disabled={actionLoading} onClick={() => {setOpenUpdateOverlay(false); clearActionForm()} }/>
          </div>
        </form>
      </div>
    </>
  );
}