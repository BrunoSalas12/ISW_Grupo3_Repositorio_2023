import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Grid from '@mui/material/Grid';
import { FiUpload } from "react-icons/fi";
import { BsBagCheckFill } from "react-icons/bs";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import ReactCards from '../Components/ReactCards';
import '../Styles/pedidos.css';
import { fetchCiudades } from '../api';
import DetallePedido from '../Components/DetallePedido';
import { FORMA_PAGO, currentYear } from '../utils/common';
import { nonEmpty, isValid, greaterOrEqualThan } from '../utils/validations';
import { Typography } from '@mui/material';
import { mbToBytes } from '../utils/conversions';



const TODAY = new Date().toISOString().split('T')[0];

const validationsEfectivo = {
  desc_objetos: nonEmpty(),
  ciudad: nonEmpty(),
  calle_comercio: nonEmpty(),
  nro_comercio: nonEmpty(),
  calle_entrega: nonEmpty(),
  nro_entrega: nonEmpty(),
  forma_pago: nonEmpty(),
  monto_efectivo: greaterOrEqualThan(50),
  fecha_entrega: nonEmpty(),
  hora_entrega: nonEmpty(),
}
const validationsTarjeta = {
  desc_objetos: nonEmpty(),
  ciudad: nonEmpty(),
  calle_comercio: nonEmpty(),
  nro_comercio: nonEmpty(),
  calle_entrega: nonEmpty(),
  nro_entrega: nonEmpty(),
  forma_pago: nonEmpty(),
  monto_efectivo: nonEmpty(),
  fecha_entrega: nonEmpty(),
  hora_entrega: nonEmpty(),
  datos_tarjeta: nonEmpty(),
}
const validationsDatosTarjeta = {
  nombre: nonEmpty(),
  apellido: nonEmpty(),
  numero: nonEmpty(),
  mesVencimiento: nonEmpty(),
  anoVencimiento: nonEmpty(),
  cvc: nonEmpty(),
}

const Pedidos = () => {
  const [montoTotal, setMontoTotal] = useState(0);
  const [seleccionarFecha, setSeleccionarFecha] = useState(false);
  const [loAntesPosible, setLoAntesPosible] = useState(false);
  const [ciudades, setCiudades] = useState([]);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [validState, setValidState] = useState({
    isValid: true,
    results: {
      desc_objetos: true,
      ciudad: true,
      calle_comercio: true,
      nro_comercio: true,
      calle_entrega: true,
      nro_entrega: true,
      forma_pago: true,
      monto_efectivo: true,
      fecha_entrega: true,
      hora_entrega: true,
      datos_tarjeta: true
    }
  });

  const [validStateTarjeta, setValidStateTarjeta] = useState({
    isValid: true,
    results: {
      nombre: true,
      apellido: true,
      numero: true,
      mesVencimiento: true,
      anoVencimiento: true,
      cvc: true,
    }
  });

  const [form, setForm] = useState({
    desc_objetos: '',
    ciudad: {},
    calle_comercio: ' ',
    nro_comercio: '',
    ref_comercio: '',
    calle_entrega: ' ',
    nro_entrega: '',
    ref_entrega: '',
    monto_total: 0,
    forma_pago: '',
    monto_efectivo: '',
    fecha_entrega: 1,
    hora_entrega: '-',
    datos_tarjeta: {},
  });

  const [cardData, setCardData] = useState({
    nombre: '',
    apellido: '',
    numero: '',
    mesVencimiento: '01',
    anoVencimiento: currentYear.toString(),
    cvc: '',
  });

  const [foto, setFoto] = useState('')
  const handleSubirFoto = (file) => {
    if (!file) return;
    if (file.size > mbToBytes(5)) {
      alert('La foto debe ser de tamaño menor a 5 MB!')
      return;
    }
    setFoto(URL.createObjectURL(file));
  }
  const inputFotoRef = useRef(null)
  const onClickSubirFoto = () => {
    inputFotoRef.current.click();
  }

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const handleSeleccionarFechaChange = () => {
    setSeleccionarFecha(!seleccionarFecha);
    setLoAntesPosible(false);
  };

  const handleLoAntesPosibleChange = () => {
    setLoAntesPosible(!loAntesPosible);
    setSeleccionarFecha(false);
  };

  const handleCalculoMontoTotal = (event) => {
    handleChange(event);
    let total = Math.abs(((form.calle_comercio?.length || 0) * 5 - (form.calle_entrega?.length || 0) * 3) * 100 + 1000);
    total = total > 500 ? total : 500;
    setMontoTotal(total);
    validationsEfectivo['monto_efectivo'] = greaterOrEqualThan(total);
  }

  const handleChange = (event) => {
    let { name, value } = event.target;
    if (name === 'monto_efectivo' && !/^\d*$/.test(value) || value === "0") return;
    setForm({ ...form, [name]: value })
  }

  const handleConfirmation = () => {
    setForm({ ...form, ['monto_total']: montoTotal });
    const validationResults = form.forma_pago === FORMA_PAGO.EFECTIVO ? isValid(form, validationsEfectivo) : isValid(form, validationsTarjeta);
    const validationResultsTarjeta = form.forma_pago === FORMA_PAGO.TARJETA ? isValid(cardData, validationsDatosTarjeta) : { isValid: true };
    setValidState((prev) => prev = { ...validationResults });
    setValidStateTarjeta((prev) => prev = { ...validationResultsTarjeta });
    console.log(form, validationResults);
    if (validationResultsTarjeta.isValid && validationResults.isValid) {
      setConfirmationModal(!confirmationModal);
    }
  }

  useEffect(() => {
    fetchCiudades()
      .then(jsonCiudades => {
        setCiudades(jsonCiudades['ciudades']);
        setForm({ ciudad: "" })
      })
      .catch(e => console.log(e));
  }, []);

  useEffect(() => {
    setForm({ ...form, fecha_entrega: 1, hora_entrega: '-' })
  }, [loAntesPosible]);

  return (
    <div>
      <Navbar />

      <h3 className='py-3 pl-4 seccion1 font-bold'>Nuevo pedido</h3>
      <div className='detallePedido'>

        <Grid container direction={{ xs: "column-reverse", lg: "row" }}>

          <Grid item xs={12} lg={5}>
            <div className='div1 mt-3 p-2 lg:ml-10'>
              <label className='font-bold pb-2 seccion2'>Productos:</label>
              <TextField
                id="filled-basic"
                name="desc_objetos"
                label="Descripcion productos"
                type="text"
                variant="filled"
                InputLabelProps={{ shrink: true }}
                error={!validState.results?.desc_objetos}
                helperText={!validState.results?.desc_objetos && "Necesitamos una descripción de los productos"}
                value={form.desc_objetos}
                onChange={handleChange}
              />
            </div>
          </Grid>

        </Grid>

        <Grid container direction={{ xs: "column-reverse", lg: "row" }}>

          <Grid item xs={12} lg={5} className='grilla2'>
            <div className='div1 lg:ml-10'>
              <button
                className="mt-2 mb-2 rounded-full botonfotos py-2 px-4 flex justify-center flex-col items-center"
                onClick={onClickSubirFoto}>
                Subir foto<FiUpload />
              </button>
              <input
                ref={inputFotoRef}
                hidden
                type="file"
                accept="image/jpg, image/jpeg"
                onChange={(e) => handleSubirFoto(e.target.files[0])}
              />
              {foto && <img src={foto} className='imageCard' alt="foto-producto" />}
            </div>
          </Grid>

        </Grid>
        <hr className='lineaHorizontalBase' />
        <h3 className='py-3 pl-4 seccion2 font-bold'>Datos de envío</h3>
        <div className='datosDeEnvio seccion2'>
          <div className='selectCiudad ml-10 my-5'>
            <label className='font-bold'>Ciudad:</label>
            {
              ciudades.length > 0 && <Select sx={{ minWidth: '175px', maxWidth: '175px' }} className='ml-3' name="ciudad" labelId="demo-simple-select-label" id="demo-simple-select" error={!validState.results?.ciudad} value={form.ciudad} onChange={handleChange}>
                {ciudades.map((c, idx) => (
                  <MenuItem key={idx} value={c}>{c['nombre']}</MenuItem>
                )
                )}
              </Select>
            }
          </div>
        </div>
        <hr className='lineaHorizontalPunteada' />
        <h3 className='py-3 pl-4 seccion2 font-bold'>Comercio</h3>
        <div className='detallesDeComercio seccion2'>
          <Grid container>
            <Grid item xs={12} lg={5}>
              <div className='flex flex-col mx-10 mt-2 mb-4 gap-1'>
                <label className='font-bold lg:mr-2'>Calle:</label>
                <TextField
                  id="filled-search"
                  name="calle_comercio"
                  label=""
                  type="search"
                  variant="filled"
                  InputLabelProps={{ shrink: true }}
                  error={!validState.results?.calle_comercio}
                  helperText={!validState.results?.calle_comercio && "La calle del comercio es requerida"}
                  value={form.calle_comercio}
                  onChange={handleCalculoMontoTotal} />
                <label className='font-bold lg:mr-2'>Nro:</label>
                <TextField
                  id="filled-search"
                  name="nro_comercio"
                  label=""
                  type="search"
                  variant="filled"
                  InputLabelProps={{ shrink: true }}
                  error={!validState.results?.nro_comercio}
                  helperText={!validState.results?.nro_comercio && "El número del comercio es requerido"}
                  value={form.nro_comercio}
                  onChange={handleChange} />
                <label className='font-bold lg:mr-2'>Referencia:</label>
                <TextField
                  id="filled-search"
                  name="ref_comercio"
                  label=""
                  type="search"
                  variant="filled"
                  InputLabelProps={{ shrink: true }}
                  value={form.ref_comercio}
                  onChange={handleChange} />
              </div>
            </Grid>

            <Grid item xs={12} lg={7} className='googleMaps py-4 mt-2 text-center'>
              <img src={require('../img/MapaCordoba.PNG')} width={600} height={600} />
            </Grid>
          </Grid>
        </div>
        <hr className='lineaHorizontalPunteada' />
        <h3 className='py-3 pl-4 seccion2 font-bold'>Destino de entrega</h3>
        <div className='detallesDeEntrega font-bold seccion2'>
          <Grid container>
            <Grid item xs={12} lg={5}>
              <div className='flex flex-col mx-10 mt-2 mb-4 gap-1'>
                <label className='font-bold lg:mr-2'>Calle:</label>
                <TextField
                  id="filled-search"
                  name="calle_entrega"
                  label=""
                  type="search"
                  variant="filled"
                  InputLabelProps={{ shrink: true }}
                  error={!validState.results?.calle_entrega}
                  helperText={!validState.results?.calle_entrega && "La calle destino es requerida"}
                  value={form.calle_entrega}
                  onChange={handleCalculoMontoTotal} />
                <label className='font-bold lg:mr-2'>Nro:</label>
                <TextField
                  id="filled-search"
                  name="nro_entrega"
                  label=""
                  type="search"
                  variant="filled"
                  InputLabelProps={{ shrink: true }}
                  error={!validState.results?.nro_entrega}
                  helperText={!validState.results?.nro_entrega && "El número del domicilio destino es requerido"}
                  value={form.nro_entrega}
                  onChange={handleChange} />
                <label className='font-bold lg:mr-2'>Referencia:</label>
                <TextField
                  id="filled-search"
                  name="ref_entrega"
                  label=""
                  type="search"
                  variant="filled"
                  value={form.ref_entrega}
                  InputLabelProps={{ shrink: true }}
                  onChange={handleChange} />
              </div>
            </Grid>

            <Grid item xs={12} lg={7} className='googleMaps py-4 mt-4 text-center'>
              <img src={require('../img/MapaCordoba.PNG')} width={600} height={600} />
            </Grid>
          </Grid>
        </div>
        <hr className='lineaHorizontalBase' />
        <h3 className='py-3 pl-4 seccion2 font-bold'>Datos de pago</h3>
        <Grid container>
          <Grid items xs={12} lg={5}>
            <div className='datosDePago'>
              <div className='mx-10 mt-2'>
                <label className='textos font-bold'>Total a pagar: $</label>
                <label className='textos font-bold'>{montoTotal}</label>
              </div>
              <div className='botonesPagos mb-2'>
                <label>Forma de pago</label>
                <div className='direccionbotonesPago'>
                  <button name="forma_pago" className={`rounded-full flex flex-col botonComun mr-2 py-2 px-4 ${form.forma_pago === FORMA_PAGO.EFECTIVO ? 'seleccionado' : ''}`} value={FORMA_PAGO.EFECTIVO} onClick={handleChange}>En efectivo</button>
                  <button name="forma_pago" className={`rounded-full flex flex-col botonComun py-2 px-4 ${form.forma_pago === FORMA_PAGO.TARJETA ? 'seleccionado' : ''}`} value={FORMA_PAGO.TARJETA} onClick={handleChange}>Con tarjeta</button>
                </div>
                {!validState.isValid && !validState.results?.forma_pago && <Typography mt="15px" color='#f44336'>Elija forma de pago</Typography>}
              </div>
            </div>
          </Grid>
          <Grid items xs={12} lg={7} className='divPagos flex justify-start'>
            <div className='interfazPago'>
              {form.forma_pago === FORMA_PAGO.EFECTIVO ? (
                <div className='monto'>
                  <TextField
                    type="text"
                    name="monto_efectivo"
                    id="montoEfectivo"
                    label="Monto en efectivo"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={!validState.results?.monto_efectivo}
                    helperText={!validState.results?.monto_efectivo && "El monto ingresado no es válido"}
                    value={form.monto_efectivo}
                    onChange={handleChange}
                  />
                </div>
              ) : form.forma_pago === FORMA_PAGO.TARJETA ? (
                <div className='datosDeLaTarjeta'>
                  <ReactCards validState={validStateTarjeta} formData={cardData} setFormData={setCardData} form={form} setForm={setForm}></ReactCards>
                </div>
              ) : null}
            </div>
          </Grid>
        </Grid>
        <hr className='lineaHorizontalBase' />
        <h3 className='py-3 pl-4 seccion2 font-bold'>Fecha de recepción</h3>
        <div className="fechaRecepcion my-2">
          <div className='labelfechas'>

            <Checkbox {...label} checked={loAntesPosible} onChange={handleLoAntesPosibleChange} />
            <label>Lo antes posible</label>
            <Checkbox {...label} checked={seleccionarFecha} onChange={handleSeleccionarFechaChange} />
            <label>Seleccionar fecha y hora</label>
            {!validState.isValid && !loAntesPosible && !seleccionarFecha && <Typography mt="15px" color='#f44336'>Elija fecha de recepción</Typography>}
          </div>

          {seleccionarFecha && (
            <div className="inputsFechaHora">
              <TextField
                id="fecha"
                name="fecha_entrega"
                label="Fecha"
                type="date"
                variant="outlined"
                fullWidth
                onKeyDown={(e) => e.preventDefault()}
                inputProps={{ min: TODAY }}
                InputLabelProps={{ shrink: true }}
                error={!validState.results?.fecha_entrega}
                helperText={!validState.results?.fecha_entrega && "La fecha de entrega es requerida"}
                defaultValue={form.fecha_entrega}
                onChange={handleChange} />
              <TextField
                id="hora"
                name="hora_entrega"
                label="Hora"
                type="time"
                variant="outlined"
                fullWidth
                InputLabelProps={{ shrink: true }}
                error={!validState.results?.hora_entrega}
                helperText={!validState.results?.hora_entrega && "La hora de entrega es requerida"}
                value={form.hora_entrega}
                onChange={handleChange} />
            </div>
          )}
        </div>
        <hr className='lineaHorizontalBase' />
        <div className='botonConfirmar py-3 mb-4 flex justify-end lg:mr-10'>
          <button onClick={handleConfirmation} className="flex flex-row gap-2 align-center rounded-full botonComun  py-2 px-4">Confirmar pedido<BsBagCheckFill /></button>
        </div>
      </div>

      <DetallePedido confirmationModal={confirmationModal} setConfirmationModal={setConfirmationModal} form={form} />

      <Footer />
    </div>
  )
}

export default Pedidos