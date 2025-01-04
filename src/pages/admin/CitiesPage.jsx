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
    const response = await ctx.api.sehirOlustur(ctx.user.token, ad, resim, video);
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
    const response = await ctx.api.sehirGuncelle(ctx.user.token, updateId, ad, resim, video);
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
                      <th className={classes.buttonColumn}>Güncelle</th>
                      <th className={classes.buttonColumn}>Sil</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      sehirler.map(sehir => <tr key={sehir.id} className={classes.tableDataRow}>
                        <td>{sehir.ad}</td>
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

          <div className={classes.formInputCont}>
            <Button label={actionLoading ? "İşleniyor ..." : "Güncelle"} type="Action" disabled={actionLoading} onClick={sehirGuncelle}/>
            <Button label={actionLoading ? "İşleniyor ..." : "İptal"} type="Action" disabled={actionLoading} onClick={() => {setOpenUpdateOverlay(false); clearActionForm()} }/>
          </div>
        </form>
      </div>
    </>
  );
}