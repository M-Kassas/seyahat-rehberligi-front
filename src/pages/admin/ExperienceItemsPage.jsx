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
 
  const [tecrubeBirimleri, setTecrubeBirimleri] = useState([]);
  const [tecrubeler, setTecrubeler] = useState([]);
  
  const [ad, setAd] = useState('');
  const [resim, setResim] = useState('');
  const [aciklama, setAciklama] = useState('');
  const [metin, setMetin] = useState('');
  const [tecrubeId, setTecrubeId] = useState('');
  
  const [updateId, setUpdateId] = useState('');
  const [actionError, setActionError] = useState('');

  useEffect(() => {
    (async function() {
      setLoading(true);
      setError('');

      const response = await ctx.api.tecrubeBirimleriGetir(ctx.user.token);
      if (response.error) {
        setError(response.errorMsg);
      } else {
        setTecrubeBirimleri(response.tecrubeBirimleri);
        const response2 = await ctx.api.tecrubeleriGetir(ctx.user.token);
        if (response2.error) {
          setError(response2.errorMsg);
        } else {
          setTecrubeler(response2.tecrubeler);
        }
      }
      setLoading(false);
    })();
  }, [refresh])

  async function deleteAction(id) {
    setActionLoading(true);
    const response = await ctx.api.tecrubeBirimiSil(ctx.user.token, id);
    if (response.error) {
      setError(response.errorMsg);
    } else {
      setRefresh(Math.random());
    }
    setActionLoading(false);
  }

  async function tecrubeBirimiOlustur() {
    setActionLoading(true);
    const response = await ctx.api.tecrubeBirimiOlustur(ctx.user.token, ad, resim, aciklama, metin, tecrubeId);
    if (response.error) {
      setActionError(response.errorMsg);
    } else {
      setOpenCreateOverlay(false);
      clearActionForm();
      setRefresh(Math.random());
    }
    setActionLoading(false);
  }

  async function tecrubeBirimiGuncelle() {
    setActionLoading(true);
    const response = await ctx.api.tecrubeBirimiGuncelle(ctx.user.token, updateId, ad, resim, aciklama, metin, tecrubeId);
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
    setAciklama("");
    setMetin("");
    setTecrubeId(tecrubeler[0].id);
    
    setActionError([]);
    setUpdateId('');
  }

  function prepareUpdate(id, ad, resim, aciklama, metin, tecrubeId) {
    setUpdateId(id);

    setAd(ad);
    setResim(resim);
    setAciklama(aciklama);
    setMetin(metin);
    setTecrubeId(tecrubeId);
    
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
        <PageLabel label="Tecrübe Birimleri" />
        {
          loading
          ? <LoadingState />
          : error.length > 0
            ? <ErrorState msg={error} />
            : <>
                <div>
                  <Button label="+ Yeni Tecrübe Birimi Ekle" type="Action" disabled={actionLoading} onClick={() => setOpenCreateOverlay(true)} />
                </div>
                <table className={classes.table}>
                  <thead className={classes.tableHeadRow}>
                    <tr>
                      <th>Ad</th>
                      <th>Tecrübe</th>
                      <th>Açıklama</th>
                      <th className={classes.buttonColumn}>Güncelle</th>
                      <th className={classes.buttonColumn}>Sil</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      tecrubeBirimleri.map(tecrubeBirimi => <tr key={tecrubeBirimi.id} className={classes.tableDataRow}>
                        <td>{tecrubeBirimi.ad}</td>
                        <td>{tecrubeler.find(t => t.id == tecrubeBirimi.tecrubeId).ad}</td>
                        <td>{tecrubeBirimi.aciklama}</td>
                        <td><Button label="Güncelle" type="Update" disabled={actionLoading} onClick={() => prepareUpdate(tecrubeBirimi.id, tecrubeBirimi.ad, tecrubeBirimi.resim, tecrubeBirimi.aciklama, tecrubeBirimi.metin, tecrubeBirimi.tecrubeId)}/></td>
                        <td><Button label="Sil" type="Delete" disabled={actionLoading} onClick={() => deleteAction(tecrubeBirimi.id)}/></td>
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
          <h1 className={classes.formTitle}>Tecrübe Birimi Oluştur</h1>
          <div className={classes.formInputCont}>
            <label className={classes.imageCont} htmlFor="resim">
              <img className={classes.image} src={resim || "https://placehold.co/600x400?text=TecrübeBirimiResim"} />
            </label>
            <input style={{display: "none"}} type={"file"} id="resim" name="resim" onChange={resimSec} />
          </div>
          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="ad">Ad:</label>
            <input className={classes.formInput} id="ad" name="ad" value={ad} onChange={(e) => setAd(e.target.value)} />
          </div>
          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="aciklama">Açıklama:</label>
            <input className={classes.formInput} id="aciklama" name="aciklama" value={aciklama} onChange={(e) => setAciklama(e.target.value)} />
          </div>
          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="tecrubeId">Tecrübe:</label>
            <select className={classes.formInput} id="tecrubeId" name="tecrubeId" value={tecrubeId} onChange={(e) => setTecrubeId(e.target.value)}>
              {tecrubeler.map(tecrube => <option key={tecrube.id} value={tecrube.id}>{tecrube.ad}</option>)}
            </select>
          </div>
          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="metin">Metin:</label>
            <textarea className={`${classes.formInput} ${classes.formTextarea}`} id="metin" name="metin" value={metin} onChange={(e) => setMetin(e.target.value)} />
          </div>
          <div className={classes.formInputCont}>
            <Button label={actionLoading ? "İşleniyor ..." : "Oluştur"} type="Action" disabled={actionLoading} onClick={tecrubeBirimiOlustur}/>
            <Button label={actionLoading ? "İşleniyor ..." : "İptal"} type="Action" disabled={actionLoading} onClick={() => {setOpenCreateOverlay(false); clearActionForm()} }/>
          </div>
        </form>
      </div>

      <div className={openUpdateOverlay ? classes.overlayOpened : classes.overlayClosed}>
        <form className={classes.form}>
          {actionError.length > 0 && <ErrorState msg={actionError} />}

          <h1 className={classes.formTitle}>Tecrübe Birimi Güncelle</h1>
          <div className={classes.formInputCont}>
            <label className={classes.imageCont} htmlFor="resim">
              <img className={classes.image} src={resim || "https://placehold.co/600x400?text=TecrübeBirimiResim"} />
            </label>
            <input style={{display: "none"}} type={"file"} id="resim" name="resim" onChange={resimSec} />
          </div>
          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="ad">Ad:</label>
            <input className={classes.formInput} id="ad" name="ad" value={ad} onChange={(e) => setAd(e.target.value)} />
          </div>
          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="aciklama">Açıklama:</label>
            <input className={classes.formInput} id="aciklama" name="aciklama" value={aciklama} onChange={(e) => setAciklama(e.target.value)} />
          </div>
          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="tecrubeId">Tecrübe:</label>
            <select className={classes.formInput} id="tecrubeId" name="tecrubeId" value={tecrubeId} onChange={(e) => setTecrubeId(e.target.value)}>
              {tecrubeler.map(tecrube => <option key={tecrube.id} value={tecrube.id}>{tecrube.ad}</option>)}
            </select>
          </div>
          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="metin">Metin:</label>
            <textarea className={`${classes.formInput} ${classes.formTextarea}`} id="metin" name="metin" value={metin} onChange={(e) => setMetin(e.target.value)} />
          </div>

          <div className={classes.formInputCont}>
            <Button label={actionLoading ? "İşleniyor ..." : "Güncelle"} type="Action" disabled={actionLoading} onClick={tecrubeBirimiGuncelle}/>
            <Button label={actionLoading ? "İşleniyor ..." : "İptal"} type="Action" disabled={actionLoading} onClick={() => {setOpenUpdateOverlay(false); clearActionForm()} }/>
          </div>
        </form>
      </div>
    </>
  );
}