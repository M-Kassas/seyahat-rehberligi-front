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
 
  const [tecrubeler, setTecrubeler] = useState([]);
  
  const [ad, setAd] = useState('');
  const [resim, setResim] = useState('');
  
  const [updateId, setUpdateId] = useState('');
  const [actionError, setActionError] = useState('');

  useEffect(() => {
    (async function() {
      setLoading(true);
      setError('');

      const response = await ctx.api.tecrubeleriGetir(ctx.user.token);
      if (response.error) {
        setError(response.errorMsg);
      } else {
        setTecrubeler(response.tecrubeler);
      }
      setLoading(false);
    })();
  }, [refresh])

  async function deleteAction(id) {
    setActionLoading(true);
    const response = await ctx.api.tecrubeSil(ctx.user.token, id);
    if (response.error) {
      setError(response.errorMsg);
    } else {
      setRefresh(Math.random());
    }
    setActionLoading(false);
  }

  async function tecrubeOlustur() {
    setActionLoading(true);
    const response = await ctx.api.tecrubeOlustur(ctx.user.token, ad, resim);
    if (response.error) {
      setActionError(response.errorMsg);
    } else {
      setOpenCreateOverlay(false);
      clearActionForm();
      setRefresh(Math.random());
    }
    setActionLoading(false);
  }

  async function tecrubeGuncelle() {
    setActionLoading(true);
    const response = await ctx.api.tecrubeGuncelle(ctx.user.token, updateId, ad, resim);
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
    
    setActionError([]);
    setUpdateId('');
  }

  function prepareUpdate(id, ad, resim) {
    setUpdateId(id);

    setAd(ad);
    setResim(resim);
    
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
        <PageLabel label="Tecrübeler" />
        {
          loading
          ? <LoadingState />
          : error.length > 0
            ? <ErrorState msg={error} />
            : <>
                <div>
                  <Button label="+ Yeni Tecrübe Ekle" type="Action" disabled={actionLoading} onClick={() => setOpenCreateOverlay(true)} />
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
                      tecrubeler.map(tecrube => <tr key={tecrube.id} className={classes.tableDataRow}>
                        <td>{tecrube.ad}</td>
                        <td><Button label="Güncelle" type="Update" disabled={actionLoading} onClick={() => prepareUpdate(tecrube.id, tecrube.ad, tecrube.resim)}/></td>
                        <td><Button label="Sil" type="Delete" disabled={actionLoading} onClick={() => deleteAction(tecrube.id)}/></td>
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
          <h1 className={classes.formTitle}>Tecrübe Oluştur</h1>
          <div className={classes.formInputCont}>
            <label className={classes.imageCont} htmlFor="resim">
              <img className={classes.image} src={resim || "https://placehold.co/600x400?text=TecrübeResim"} />
            </label>
            <input style={{display: "none"}} type={"file"} id="resim" name="resim" onChange={resimSec} />
          </div>
          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="ad">Ad:</label>
            <input className={classes.formInput} id="ad" name="ad" value={ad} onChange={(e) => setAd(e.target.value)} />
          </div>
          <div className={classes.formInputCont}>
            <Button label={actionLoading ? "İşleniyor ..." : "Oluştur"} type="Action" disabled={actionLoading} onClick={tecrubeOlustur}/>
            <Button label={actionLoading ? "İşleniyor ..." : "İptal"} type="Action" disabled={actionLoading} onClick={() => {setOpenCreateOverlay(false); clearActionForm()} }/>
          </div>
        </form>
      </div>

      <div className={openUpdateOverlay ? classes.overlayOpened : classes.overlayClosed}>
        <form className={classes.form}>
          {actionError.length > 0 && <ErrorState msg={actionError} />}

          <h1 className={classes.formTitle}>Tecrübe Güncelle</h1>
          <div className={classes.formInputCont}>
            <label className={classes.imageCont} htmlFor="resim">
              <img className={classes.image} src={resim || "https://placehold.co/600x400?text=TecrübeResim"} />
            </label>
            <input style={{display: "none"}} type={"file"} id="resim" name="resim" onChange={resimSec} />
          </div>
          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="ad">Ad:</label>
            <input className={classes.formInput} id="ad" name="ad" value={ad} onChange={(e) => setAd(e.target.value)} />
          </div>

          <div className={classes.formInputCont}>
            <Button label={actionLoading ? "İşleniyor ..." : "Güncelle"} type="Action" disabled={actionLoading} onClick={tecrubeGuncelle}/>
            <Button label={actionLoading ? "İşleniyor ..." : "İptal"} type="Action" disabled={actionLoading} onClick={() => {setOpenUpdateOverlay(false); clearActionForm()} }/>
          </div>
        </form>
      </div>
    </>
  );
}