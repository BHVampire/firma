import ReactDOMServer from 'react-dom/server'
import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { useFormik } from 'formik'
import StepWizard from 'react-step-wizard'
import titleize from 'titleize'
import Button from './components/UI/Button/Button'
import Input from './components/UI/Input/Input'
import Select from './components/UI/Select/Select'
import Icon from './components/UI/Icon/Icon'
import Modal from './components/UI/Modal/Modal'
import NumberFormat from 'react-number-format'
import CardHeader from './components/UI/Card/CardHeader/CardHeader'
import ToastCall from './utils/ToastCall'
import AvatarEditor from 'react-avatar-editor'
import Dropzone from 'react-dropzone'
import Slider from '@material-ui/core/Slider'
import imageToSlices from 'image-to-slices'
import { toPng } from 'html-to-image'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { ReactComponent as Logo } from './assets/vectors/logo.svg'
import { zoomLevel } from "zoom-level"
import AdaptiveText from 'react-adaptive-text'
import './App.scss'
import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core'
import { boolean } from 'boolean'
import Card from './components/UI/Card/Card'
import Tooltip from './components/UI/Tooltip/Tooltip'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination, Navigation } from 'swiper'

// // Import Swiper styles
import 'swiper/swiper-bundle.css'
// import "swiper/css/pagination"
// import "swiper/css/navigation"

SwiperCore.use([Pagination, Navigation])

const icons = {
  academia: {
    url: 'https://santandernet.sharepoint.com/sites/CatlogoAcademiaMX',
    format: 'png'
  },
  workday: {
    url: 'https://wd3.myworkday.com/santander/d/inst/13102!CK5mGhIKBggDEMenAhIICgYI1A0QuwE~/cacheable-task/2997$2151.htmld#backheader=true',
    format: 'svg'
  },
  talento: {
    url: 'https://santandernet.sharepoint.com/sites/TalentoSantander496/SitePages/Bienvenidos-al-espacio-de-Talento-Santander.aspx?source=https%3A%2F%2Fsantandernet.sharepoint.com%2Fsites%2FTalentoSantander496',
    format: 'svg'
  }
}

const App = () => {
  const signature = useRef(null)
  const [isCatalogueOpen, setIsCatalogueOpen] = useState(false)
  const [isTutorial365Open, setIsTutorial365Open] = useState(false)
  const [isTutorial2013Open, setIsTutorial2013Open] = useState(false)
  const [isFAQOpen, setIsFAQOpen] = useState(false)

  const formik = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      phone: '',
      isPhoneMobile: false,
      isAreaCodeTwoDigits: false,
      extension: '',
      email: '',
      executiveDirection: 'Atracción y Desarrollo del Talento',
      gender: 0,
      job: '',
      area: '',
      department: '',
      subDepartment: '',
      address: '',
      customIcon: '',
      customIconURL: ''
    }
  })

  const departments = useMemo(() => {
    formik.setFieldValue('department', '')

    switch (formik.values.area) {

      case 'Atracción y Desarrollo del Talento':
        return {
          'Atracción y Desarrollo del Talento': 'Atracción y Desarrollo del Talento'
        }

      case 'Academia':
        return {
          'Academia': 'Academia',
          'Conocimiento': 'Conocimiento',
          'Desarrollo': 'Desarrollo',
          'Estrategia Educativa': 'Estrategia Educativa',
          'Formación': 'Formación',
          'Implementación': 'Implementación'
        }

      case 'Atracción de Talento':
        return {
          'Atracción de Talento': 'Atracción de Talento'
        }

      case 'Talento y Diversidad e Inclusión':
        return {
          'Talento y Diversidad e Inclusión': 'Talento y Diversidad e Inclusión',
          'Performance': 'Performance',
        }

      default:
        return {}
    }
  }, [formik.values.area])

  const jobs = useMemo(() => {
    const { area, department } = formik.values

    formik.setFieldValue('job', '')

    const getJobs = () => {
      switch (`${area}-${department}`) {

        case 'Atracción y Desarrollo del Talento-Atracción y Desarrollo del Talento':
          return {
            'Dirección Ejecutiva': [
              "Dirección Ejecutiva"
            ]
          }

        case 'Academia-Academia':
          return {
            'Dirección': [
              "Dirección"
            ],
            'Especialista RRHH': [
              "Especialista RRHH"
            ],
            'Subdirección': [
              "Subdirección"
            ],
          }

        case 'Academia-Conocimiento':
          return {
            'Coordinación': [
              "Coordinación"
            ],
            'Gerencia': [
              "Gerencia"
            ],
            'Instrucción': [
              "Instrucción"
            ],
            'Subdirección': [
              "Subdirección"
            ],
          }

        case 'Academia-Desarrollo':
          return {
            'Coordinación': [
              "Coordinación"
            ],
            'Gerencia': [
              "Gerencia"
            ],
            'Instrucción': [
              "Instrucción"
            ],
          }

        case 'Academia-Estrategia Educativa':
          return {
            'Autoría de Contenido': [
              "Autoría de Contenido"
            ],
            'Comunicación Visual': [
              "Comunicación Visual"
            ],
            'Coordinación': [
              "Coordinación"
            ],
            'Diseño Instruccional ': [
              "Diseño Instruccional "
            ],
            'Gerencia': [
              "Gerencia"
            ],
            'Marketing': [
              "Marketing"
            ],
            'Programación': [
              "Programación"
            ],
            'Subdirección': [
              "Subdirección"
            ],
          }

        case 'Academia-Formación':
          return {
            'Consultoría': [
              "Consultoría"
            ],
            'Coordinación': [
              "Coordinación"
            ],
            'Gerencia': [
              "Gerencia"
            ],
            'Instrucción': [
              "Instrucción"
            ],
            'Subdirección': [
              "Subdirección"
            ],
          }

        case 'Academia-Implementación':
          return {
            'Coordinación': [
              "Coordinación"
            ],
            'Especialista Logística': [
              "Especialista Logística"
            ],
            'Gerencia': [
              "Gerencia"
            ],
            'Subdirección': [
              "Subdirección"
            ],
          }

        case 'Atracción de Talento-Atracción de Talento':
          return {
            'Asesor': [
              "Asesor"
            ],
            'Dirección': [
              "Dirección"
            ],
            'Gerencia': [
              "Gerencia"
            ],
            'Subdirección': [
              "Subdirección"
            ],
          }

        case 'Talento y Diversidad e Inclusión-Talento y Diversidad e Inclusión':
          return {
            'Asesor': [
              "Asesor"
            ],
            'Becario Banco': [
              "Becario Banco"
            ],
            'Dirección': [
              "Dirección"
            ],
            'Gerencia': [
              "Gerencia"
            ],
            'Subdirección': [
              "Subdirección"
            ],
          }

        case 'Talento y Diversidad e Inclusión-Performance':
          return {
            'Especialista RRHH': [
              "Especialista RRHH"
            ],
            'Subdirección': [
              "Subdirección"
            ],
          }

        default:
          return {}
      }
    }

    const keys = Object.keys(getJobs())

    return keys.reduce((acc, e) => {
      acc = {
        ...acc,
        [e]: getJobs()[e][formik.values.gender]
      }

      return acc
    }, {})
  }, [formik.values.area, formik.values.department])

  const subDepartments = useMemo(() => {
    const { area, department, job } = formik.values

    formik.setFieldValue('subDepartment', '')

    const getJobs = () => {
      switch (`${area}-${department}-${job}`) {


        default:
          return {}
      }
    }

    const keys = Object.keys(getJobs())

    return keys.reduce((acc, e) => {
      acc = {
        ...acc,
        [e]: getJobs()[e][formik.values.gender]
      }

      return acc
    }, {})
  }, [formik.values.area, formik.values.department, formik.values.job])

  return (
    <div className="app container">
      <Modal isOpen={isCatalogueOpen} setIsOpen={setIsCatalogueOpen} width="32rem">
        <h2>Atracción y Desarrollo del Talento</h2>
        <blockquote>
          <li>Dirección Ejecutiva</li>
        </blockquote>

        <br />

        <h2>Talento y Diversidad e Inclusión</h2>
        <blockquote>
          <h3>Talento y Diversidad e Inclusión</h3>
          <blockquote>
            <li>Asesor</li>
            <li>Becario Banco</li>
            <li>Dirección</li>
            <li>Gerencia</li>
            <li>Subdirección</li>
          </blockquote>
          <br />
          <h3>Performance</h3>
          <blockquote>
            <li>Especialista RRHH</li>
            <li>Subdirección</li>
          </blockquote>
        </blockquote>

        <br />

        <h2>Atracción de Talento</h2>
        <blockquote>
          <li>Asesor</li>
          <li>Dirección</li>
          <li>Gerencia</li>
          <li>Subdirección</li>
        </blockquote>

        <br />

        <h2>Academia</h2>
        <blockquote>
          <li>Dirección</li>
          <li>Especialista RRHH</li>
          <li>Subdirección</li>
        </blockquote>

        <blockquote>
          <h3>Formación</h3>
          <blockquote>
            <li>Consultoría</li>
            <li>Coordinación</li>
            <li>Gerencia</li>
            <li>Instrucción</li>
            <li>Subdirección</li>
          </blockquote>
          <br />
          <h3>Conocimiento</h3>
          <blockquote>
            <li>Coordinación</li>
            <li>Gerencia</li>
            <li>Instrucción</li>
            <li>Subdirección</li>
          </blockquote>
          <br />
          <h3>Desarrollo</h3>
          <blockquote>
            <li>Coordinación</li>
            <li>Gerencia</li>
            <li>Instrucción</li>
          </blockquote>
          <br />
          <h3>Estrategia Educativa</h3>
          <blockquote>
            <li>Autoría de Contenido</li>
            <li>Comunicación Visual</li>
            <li>Coordinación</li>
            <li>Diseño Instruccional </li>
            <li>Gerencia</li>
            <li>Marketing</li>
            <li>Programación</li>
            <li>Subdirección</li>
          </blockquote >
          <br />
          <h3>Implementación</h3>
          <blockquote>
            <li>Coordinación</li>
            <li>Especialista Logística</li>
            <li>Gerencia</li>
            <li>Subdirección</li>
          </blockquote >
        </blockquote >
      </Modal >

      <Modal isOpen={isTutorial365Open} setIsOpen={setIsTutorial365Open}>
        <div style={{ textAlign: 'center' }} >
          <img style={{ maxWidth: '100%' }} src="./assets/images/novedades.png" />
        </div>

        <br />

        <h1 style={{ textAlign: 'center' }} >Instrucciones</h1>
        <blockquote>
          <h3>Paso 1</h3>

          <ul>Elige una aplicación (Versión de escritorio o versión web) y haz clic en el botón correspondiente.</ul>
          <br />
          <div style={{ textAlign: 'center' }} >
            <img src="./assets/images/tutorial/1.png" />
          </div>
        </blockquote>

        <blockquote>
          <h3>Paso 2</h3>

          <ul>
            <li>Después de unos segundos tu firma estará lista y se abrirá en una nueva pestaña (El tiempo puede variar dependiendo del dispositivo).</li>
            <li>En esta nueva pestaña presiona las teclas <b>«Control + A»</b> para seleccionar la firma.</li>
          </ul>
          <br />

          <div style={{ textAlign: 'center' }} >
            <img style={{ maxWidth: '100%' }} src="./assets/images/tutorial/3.png" />
          </div>

          <br />

          <ul>
            <li>Ahora cópiala presionando las teclas <b>«Control + C»</b>.</li>
            <li><b>Es importante que uses el teclado para copiar y pegar tu firma durante todo el proceso.</b></li>
          </ul>
        </blockquote>

        <blockquote>
          <h3>Paso 3</h3>

          <ul>Haz <a href="https://outlook.office.com/mail/options/mail/messageContent" target="_blank" rel="noreferrer"><b>clic aquí</b></a> para abrir un vínculo donde pegarás tu nueva firma presionando las teclas <b>«Control + V»</b> en el campo <b>Firma de correo electrónico</b> o bien, haciendo clic derecho y seleccionando <b>Pegar</b>.</ul>
          <br />
          <div style={{ textAlign: 'center' }} >
            <img style={{ maxWidth: '100%' }} src="./assets/images/tutorial/5.png" />
          </div>
        </blockquote>

        <blockquote>
          <h3>Paso 4</h3>

          <ul>Verifica tu firma enviándote a ti mismo un correo de prueba.</ul>

        </blockquote>

        <h1 style={{ textAlign: 'center' }} >¡Disfruta tu nueva firma!</h1>
        <div style={{ textAlign: 'center' }} >Hecho con ❤️ por parte del equipo de formación.</div>

        <div>
          <br />
          Cualquier duda o inconveniente puedes comunicarte por <b>Teams</b> o Correo Electrónico con:
          <ul>
            <li>Pichardo: <b>lfpichardo@santander.com.mx</b></li>
            <li>Cecilia: <b>csalasr@santander.com.mx</b></li>
          </ul>
        </div>

      </Modal>

      <Modal isOpen={isTutorial2013Open} setIsOpen={setIsTutorial2013Open}>
        <div style={{ textAlign: 'center' }} >
          <img src="./assets/images/novedades.png" />
        </div>

        <br />

        <h1 style={{ textAlign: 'center' }} >Instrucciones</h1>
        <blockquote>
          <h3>Paso 1</h3>

          <ul>Elige una aplicación (Versión de escritorio o versión web) y haz clic en el botón correspondiente.</ul>
          <div style={{ textAlign: 'center' }} >
            <img src="./assets/images/tutorial/2.png" />
          </div>
        </blockquote>

        <blockquote>
          <h3>Paso 2</h3>

          <ul>
            <li>Después de unos segundos tu firma estará lista y se descargará un <b>archivo comprimido</b> (El tiempo puede variar dependiendo del dispositivo).</li>
            <br />
            <div style={{ textAlign: 'center' }}><Icon margin="0.3rem 0 0 0" color="#00acc1" icon="info" size={3} style="outlined" /></div>
            <h1 style={{ textAlign: 'center', color: '#00acc1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>¡Importante!</h1>
            <br />
            <h3 style={{ textAlign: 'center' }}>Guarda el archivo comprimido en tu equipo, encuentra el archivo y <b>descomprímelo</b>.</h3>
            <br />
            <li>Después de <b>descomprimir</b> verás un archivo y una carpeta.</li>
          </ul>
          <div style={{ textAlign: 'center' }} >
            <img src="./assets/images/tutorial/4.png" />
          </div>

          <br />
          <ul>
            <li>Abre el archivo <b>index.html</b> en Chrome, y presiona las teclas <b>«Control + A»</b> para seleccionar la firma.</li>
          </ul>

          <div style={{ textAlign: 'center' }} >
            <img style={{ maxWidth: '100%' }} src="./assets/images/tutorial/3.png" />
          </div>

          <br />

          <ul>
            <li>Ahora cópiala presionando las teclas <b>«Control + C»</b>.</li>
            <li><b>Es importante que uses el teclado para copiar y pegar tu firma durante todo el proceso.</b></li>
          </ul>
        </blockquote>

        <blockquote>
          <h3>Paso 3</h3>

          <ul>
            <li>Abre Outlook 2013 y crea un nuevo correo.</li>
            <li>Haz clic en la opción del menú <b>«Firma»</b> y después en <b>«Firmas...»</b>.</li>
          </ul>
          <div style={{ textAlign: 'center' }} >
            <img src="./assets/images/tutorial/6.png" />
          </div>

          <br />

          <ul>
            <li>Haz clic en la opción <b>«Nueva»</b> e ingresa un nombre para tu firma.</li>
            <li>Pega tu nueva firma presionando las teclas <b>«Control + V»</b> en el campo <b>Editar firma</b>.</li>
          </ul>
          <div style={{ textAlign: 'center' }}><Icon color="#ff9800" margin="0.3rem 0 0 0" icon="warning_amber" size={3} /></div>
          <h1 style={{ textAlign: 'center', color: '#ff9800', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>¡Advertencia!</h1>

          <ul style={{ textAlign: 'center' }}><b>La firma se verá invisible en esta sección, pégala 1 sola vez para evitar que se duplique, pero no te preocupes, en tu correo se verá con normalidad.</b></ul>
          <div style={{ textAlign: 'center' }} >
            <img style={{ maxWidth: '100%' }} src="./assets/images/tutorial/7.png" />
          </div>

          <ul>
            <li>Haz clic en el botón <b>Aceptar</b> para guardar tu firma.</li>
          </ul>
        </blockquote>

        <blockquote>
          <h3>Paso 4</h3>

          <ul>
            <li>Es posible que durante la edición del correo tu firma se vea cortada, no te preocupes, esto se solucionará cuando lo envíes.</li>
          </ul>
          <div style={{ textAlign: 'center' }} >
            <img style={{ maxWidth: '100%' }} src="./assets/images/tutorial/8.png" />
          </div>

          <ul>
            <li><b>Verifica que tu firma se vea bien enviándote a ti mismo un correo de prueba.</b></li>
          </ul>

        </blockquote>

        <br />

        <h1 style={{ textAlign: 'center' }} >¡Disfruta tu nueva firma!</h1>
        <div style={{ textAlign: 'center' }} >Hecho con ❤️ por parte del equipo de formación.</div>

        <div>
          <br />
          Cualquier duda o inconveniente puedes comunicarte por <b>Teams</b> o Correo Electrónico con:
          <ul>
            <li>Pichardo: <b>lfpichardo@santander.com.mx</b></li>
            <li>Cecilia: <b>csalasr@santander.com.mx</b></li>
          </ul>
        </div>

      </Modal>

      <Modal isOpen={isFAQOpen} setIsOpen={setIsFAQOpen}>
        <h1 style={{ textAlign: 'center' }} >Preguntas Frecuentes</h1>
        <br />
        <h3 style={{ textAlign: 'center' }}>Identifica si tienes alguno de estos inconvenientes para generar tu firma y sus posibles soluciones</h3>

        <br />

        <blockquote>
          <p><b><big>1</big> Al abrir el archivo "index" no se ve la imagen de mi firma.</b></p>
          <ul>Es indispensable <b>descomprimir</b> primero el archivo ZIP y después abrir el link "Index", de lo contrario no podrás ver correctamente tu firma.</ul>
          <br />
          <br />
          <div style={{ textAlign: 'center' }} >
            <img style={{ maxWidth: '100%' }} src="./assets/images/faq/1.png" />
          </div>
        </blockquote>

        <blockquote>
          <p><b><big>2</big> Al abrir el archivo "index" la imagen de mi firma se ve cortada.</b></p>
          <ul>Es indispensable que desde que generas tu firma y antes de descargar el ZIP, te asegures que el Zoom de tu navegador este en 100%, de lo contrario no se generará correctamente.</ul>
          <br />
          <br />
          <div style={{ textAlign: 'center' }} >
            <img style={{ maxWidth: '100%' }} src="./assets/images/faq/2.png" />
          </div>
        </blockquote>

        <blockquote>
          <p><b><big>3</big> No puedo copiar mi firma o se copia solo una parte.</b></p>
          <ul>
            Para seleccionar, copiar y pegar tu firma, debes usar los comandos del teclado de tu equipo.
            <ul>
              <li>Control + <b>A</b> = <b>Seleccionar</b></li>
              <li>Control + <b>C</b> = <b>Copiar</b></li>
              <li>Control + <b>V</b> = <b>Pegar</b></li>
            </ul>
          </ul>
        </blockquote>

        <blockquote>
          <p><b><big>4</big> Al pegar mi firma en Outlook no se ve o no puedo pegarla.</b></p>
          <ul>La firma en "Invisible", solo pégala (Ctrl+v), haz clic en «Aceptar» y asegúrate de haberla agregado correctamente, usando la sección «Firma» de Outlook y enviándote a ti mismo o un compañero una prueba.</ul>
          <br />
          <br />
          <div style={{ textAlign: 'center' }} >
            <img style={{ maxWidth: '100%' }} src="./assets/images/faq/3.png" />
          </div>
        </blockquote>

        <blockquote>
          <p><b><big>5</big> Pegué la firma "Invisible" y aun así no se ve.</b></p>
          <ul>Abre un nuevo correo y localiza la sección «Firma», haz clic y localiza el nombre con el que la guardaste, selecciónala y haz clic.</ul>
        </blockquote>

        <blockquote>
          <p><b><big>6</big> Al agregar mi firma se ven unas líneas sobre ella.</b></p>
          <ul>No te preocupes, cuando envíes el correo las líneas ya no serán visibles. Haz una prueba para asegurarte.</ul>
          <br />
          <br />
          <div style={{ textAlign: 'center' }} >
            <img style={{ maxWidth: '100%' }} src="./assets/images/faq/4.png" />
          </div>
        </blockquote>

      </Modal>


      <CardHeader
        style={{ display: 'block' }}
        icon="face"
        sideTitle="¡Crea tu firma de correo!"
      >
        <StepWizard >
          <StepZero />
          <StepOne formik={formik} />
          <StepTwo formik={formik} departments={departments} jobs={jobs} subDepartments={subDepartments} setIsCatalogueOpen={setIsCatalogueOpen} />
          <StepTree formik={formik} signature={signature} setIsTutorial365Open={setIsTutorial365Open} setIsTutorial2013Open={setIsTutorial2013Open} setIsFAQOpen={setIsFAQOpen} />
        </StepWizard>
      </CardHeader>


      <div className="signature-wrapper">
        <div className="inner-wrapper" ref={signature}>

          <div className="signature" >
            <div className="avatar">
              <Logo className="logo" />
              <img className="photo" src={formik.values.avatar} alt="Avatar" />
              <Logo className="logo-back" />
            </div>

            <div className="info">
              <div className="executive-direction" >
                <img src={'assets/images/title.svg'} alt="title" />
              </div>

              <div className="data">
                <div className="left">
                  {/* <ControlledText className="name" fontSizeMin={20} fontSizeMax={36} clampSuffix={"..."}>
                {formik.values.name}
              </ControlledText> */}

                  <div className="name">
                    <AdaptiveText
                      fontSizeMin={20}
                      fontSizeMax={36}
                      text={formik.values.name}
                    />
                  </div>

                  <div className="last-name">
                    <AdaptiveText
                      fontSizeMin={16}
                      fontSizeMax={20}
                      text={formik.values.lastName}
                    />
                  </div>


                  {/* <ControlledText className="last-name" fontSizeMin={16} fontSizeMax={20} clampSuffix={"..."}>
                {formik.values.lastName}
              </ControlledText> */}

                  <div className="job">
                    <p>{formik.values.job}</p>
                    {
                      formik.values.subDepartment && formik.values.department !== formik.values.area !== formik.values.subDepartment
                        ? <p>{formik.values.subDepartment}</p>
                        : ''
                    }

                    {
                      formik.values.department !== formik.values.area
                        ? <p>{formik.values.department}</p>
                        : ''
                    }
                    <p>{formik.values.area}</p>
                  </div>

                </div>

                <div className="right">

                  {
                    formik.values.email
                      ? <div className="icon-1">
                        <a href={`https://teams.microsoft.com/l/chat/0/0?users=${formik.values.email}@santander.com.mx`} target="_blank" rel="noreferrer">
                          <img src={'assets/images/icons/teams.svg'} alt="Teams" />
                        </a>
                        <Icon units="em" className="icon-1-1" icon="ads_click" size={1.23} theme="secondary" />
                      </div>
                      : ''
                  }

                  <div className="text-1">
                    <a href={`https://teams.microsoft.com/l/chat/0/0?users=${formik.values.email}@santander.com.mx`} target="_blank" rel="noreferrer">
                      {formik.values.email}
                      {
                        formik.values.email
                          ? <b>@</b>
                          : ''
                      }
                    </a>
                  </div>

                  {
                    formik.values.phone
                      ? <Fragment>
                        <div className="text-2"><span>{formik.values.phone}</span>{
                          formik.values.extension && !formik.values.isPhoneMobile
                            ? <span><small>Ext.</small>{formik.values.extension}</span>
                            : ''
                        }</div>

                        <div className="icon-2">
                          <Icon units="em" icon={!formik.values.isPhoneMobile ? 'phone' : 'phone_android'} size={1.85} theme="secondary" />
                        </div>
                      </Fragment>
                      : ''
                  }

                  {
                    formik.values.address
                      ? <Fragment>
                        <div className="icon-3">
                          <Icon units="em" icon="fmd_good" size={1.85} theme="secondary" />
                        </div>

                        <div className="text-3">{formik.values.address}</div>
                      </Fragment>
                      : ''
                  }

                </div>
              </div>

              <div className="know-more" >
                <Icon units="em" className="icon-2-1" icon="ads_click" size={1.23} theme="secondary" />

                <a href={`https://logcorp.aacc.gs.corp/?environment=0&okURI=https%3A%2F%2Fespacio-empleado.aacc.gs.corp`} target="_blank" rel="noreferrer">
                  <img src={'assets/images/icons/onehr.svg'} alt="OneHR" />
                </a>


                {
                  formik?.values?.customIcon
                    ? formik.values.customIcon === 'talento'
                      ? <a href={icons[formik?.values?.customIcon]?.url} target="_blank" rel="noreferrer">
                        {
                          console.log(formik?.values?.customIcon)
                        }
                        <img style={{ maxWidth: '90px', width: '90px', maxHeight: '40px', }} src={`assets/images/icons/${formik?.values?.customIcon}.${icons[formik?.values?.customIcon].format}`} alt="Academia" />
                      </a>
                      : <a href={icons[formik?.values?.customIcon]?.url} target="_blank" rel="noreferrer">
                        {
                          console.log(formik?.values?.customIcon)
                        }
                        <img src={`assets/images/icons/${formik?.values?.customIcon}.${icons[formik?.values?.customIcon].format}`} alt="Academia" />
                      </a>
                    : ''
                }
              </div>

            </div>
          </div>
        </div>

      </div>
    </div >
  )
}

const StepZero = ({ nextStep }) => {

  const handleSubmit = e => {
    e.preventDefault()
    nextStep()
  }

  return (
    <div className="row step-zero">
      <div>
        <h1 style={{ textAlign: 'center' }}>¡Recibe una cordial bienvenida!</h1>
        <br />

        <h2 style={{ textAlign: 'center' }}>Antes de comenzar es <b>indispensable</b> que tomes en cuenta <b>la siguiente información</b></h2>

        <blockquote>
          El <b>zoom</b> de la página debe ser exactamente <b>100%</b> o tu firma se verá cortada.
          <br />
          <br />
          Puedes verificar el zoom de la página accediendo al siguiente menú de tu navegador.
          <div style={{ margin: '4px 0' }} >
            <img style={{ width: '700px', maxWidth: '100%' }} src="./assets/images/stepZero/1.png" />
          </div>
        </blockquote>

        <blockquote>
          Al finalizar de crear tu firma, se descargará un archivo <b>comprimido</b> en formato <b>.zip</b>, es muy importante que lo <b>descomprimas</b> o <b>extraigas</b> para que funcione.
          <br />
          <br />
          <b>Para extraer el archivo:</b>
          <ul>
            <li>Haz clic derecho sobre el archivo descargado.</li>
            <li>Haz clic en <b>7-Zip</b></li>
            <li>Haz clic en <b>Extraer en "firma\"</b></li>
          </ul>
          <div style={{ margin: '4px 0' }}>
            <img style={{ width: '700px', maxWidth: '100%' }} src="./assets/images/stepZero/2.png" />
          </div>
          {/* <div style={{ textAlign: 'center' }} >
            <Swiper pagination={{
              "type": "progressbar"
            }} navigation={true} className="mySwiper">
              <SwiperSlide>Slide 1</SwiperSlide>
              <SwiperSlide>Slide 2</SwiperSlide>
              <SwiperSlide>Slide 3</SwiperSlide>
            </Swiper>
          </div> */}
        </blockquote>

        <blockquote>
          <b>Tool Tips</b>
          <br />
          Para asegurarte que estás llenando las casillas correctamente arrastra el mouse arriba de estos botones:
          <br />
          <img style={{ width: '3rem', margin: '4px 0' }} src="./assets/images/confirmation/1.png" />
        </blockquote>

        <blockquote>
          <b>Instrucciones</b>
          <br />
          Para leer las instrucciones, antes de descargar tu firma haz clic en estos botones.
          <br />
          <img style={{ width: '3rem', margin: '4px 0' }} src="./assets/images/confirmation/3.png" />
        </blockquote >

        <br />

        <div className="wizard-controller">
          <Button onClick={e => handleSubmit(e)} bar={true} size={3} type="button" theme="primary" icon="arrow_forward_ios" waves="light" />
        </div>
      </div>
    </div >
  )
}

const StepOne = ({ formik, previousStep, nextStep }) => {
  const { handleChange, values, setFieldValue } = useMemo(() => formik, [formik])
  const [source, setSource] = useState({ image: './assets/images/avatar.png' })
  const [scale, setScale] = useState(1)
  const [genderRadio, setGenderRadio] = useState('0')
  const [isPhoneMobileRadio, setIsPhoneMobileRadio] = useState('false')
  const [isAreaCodeTwoDigitsRadio, setIsAreaCodeTwoDigitsRadio] = useState('false')
  const [customEmail, setCustomEmail] = useState('')

  const avatar = useRef(null)

  const handleSubmit = e => {
    e.preventDefault()

    const name = values.name
    const lastName = values.lastName
    const phone = values.phone
    const email = values.email

    if (!name || !lastName || !phone || !email) {
      ToastCall('Por favor ingresa todos los campos.', 'warning')
      return
    }
    nextStep()
  }

  const handleImageChange = () => {
    if (avatar.current) {
      // If you want the image resized to the canvas size (also a HTMLCanvasElement)

      const canvasScaled = avatar.current.getImageScaledToCanvas()

      setFieldValue('avatar', canvasScaled.toDataURL())
    }
  }

  const handleDrop = (dropped) => {
    setSource({ image: dropped[0] })
  }

  useEffect(() => {
    setFieldValue('gender', Number(genderRadio))
  }, [genderRadio])

  useEffect(() => {
    setFieldValue('isPhoneMobile', boolean(isPhoneMobileRadio))
  }, [isPhoneMobileRadio])

  useEffect(() => {
    setFieldValue('isAreaCodeTwoDigits', boolean(isAreaCodeTwoDigitsRadio))
  }, [isAreaCodeTwoDigitsRadio, values.phone])

  useEffect(() => {
    let email

    if (customEmail.includes('@')) email = customEmail.split('@')[0]
    else email = customEmail

    setFieldValue('email', email)
  }, [customEmail])

  return (
    <div className="row step-one">
      <div className="col-6 left">
        <div className="avatar-section">
          <br />
          <p className="help">
            <Tooltip
              position="relative"
              inline={true}
              placement="right"
              text="Elige una fotografía con un look profesional."
            />
            Sube tu fotografía o arrástrala al marco.
          </p>

          <br />

          <Dropzone
            onDrop={handleDrop}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className="d-flex justify-content-center">
                <Button bar={true} theme="rose" icon="file_upload" >Subir Imagen</Button>
                <input {...getInputProps()} />
              </div>
            )}
          </Dropzone>

          <br />

          <Dropzone
            onDrop={handleDrop}
            noClick
            noKeyboard
            style={{ width: '250px', height: '250px' }}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <AvatarEditor
                  ref={avatar}
                  onImageReady={() => handleImageChange()}
                  onImageChange={() => handleImageChange()}
                  width={250}
                  height={250}
                  border={0}
                  borderRadius={125}
                  color={[255, 255, 255, 0.75]}
                  scale={scale}
                  image={source.image}
                />
                <input {...getInputProps()} />
              </div>
            )}
          </Dropzone>

          <br />
          <br />
          <br />
          <Slider
            color="secondary"
            value={scale}
            onChange={(e, value) => setScale(value)}
            aria-labelledby="continuous-slider"
            min={1}
            max={5}
            marks
            step={0.1}
            valueLabelDisplay="on"
          />
          <p style={{ fontWeight: 'bold', textAlign: 'center' }}>
            - Escala +
          </p>

        </div>
      </div>

      <div className="col-6">
        <CustomInput id="name" value={titleize(values.name)} onChange={handleChange} label="Nombre" icon="face" tooltip={`Escribe tu nombre y apellidos, en caso de tener 2 nombres te recomendamos colocar solo uno.    
        <li>Jenell Dahlia: <b>Jenell</b></li>`} />
        <CustomInput id="lastName" value={titleize(values.lastName)} onChange={handleChange} label="Apellidos" icon="badge" tooltip={`Si tus apellidos son muy largos puedes abreviar uno de ellos con una letra y un punto.  
        <li>Brown Afflerbach: <b>B. Afflerbach<b></li>`} />

        <CustomInput id="email" value={customEmail.trim()} onChange={e => setCustomEmail(e.target.value)} label="Correo Electrónico" icon="alternate_email" tooltip="No es necesario que escribas el dominio <b>@santander.com.mx</b>" />

        <Card>
          <p>¿Qué tipo de teléfono quieres agregar?</p>
          <div>
            <RadioGroup row onChange={(e) => setIsPhoneMobileRadio(e.target.value)}>
              <FormControlLabel
                value="false"
                control={<Radio checked={isPhoneMobileRadio === 'false'} color="secondary" />}
                label="Corporativo"
                labelPlacement="end"
              />

              <FormControlLabel
                value="true"
                control={<Radio checked={isPhoneMobileRadio === 'true'} color="secondary" />}
                label="Personal"
                labelPlacement="end"
              />
            </RadioGroup>
          </div>

          <br />

          <p>¿Cuántos dígitos tiene la clave lada?</p>
          <div>
            <RadioGroup row onChange={(e) => setIsAreaCodeTwoDigitsRadio(e.target.value)}>
              <FormControlLabel
                value="true"
                control={<Radio checked={isAreaCodeTwoDigitsRadio === 'true'} color="secondary" />}
                label="2"
                labelPlacement="end"
              />

              <FormControlLabel
                value="false"
                control={<Radio checked={isAreaCodeTwoDigitsRadio === 'false'} color="secondary" />}
                label="3"
                labelPlacement="end"
              />
            </RadioGroup>
          </div>
        </Card>


        {
          !values?.isPhoneMobile
            ? <div className="row">
              <div className="col-8">
                <NumberFormat id="phone" value={values.phone} onChange={handleChange} label="Teléfono" icon="phone" customInput={CustomInput} format={values.isAreaCodeTwoDigits ? '(##) ####-####' : '(###) ###-####'} mask="_" tooltip="Teléfono del edificio y extensión" />
              </div>
              <div className="col-4">
                <NumberFormat id="extension" value={values.extension} onChange={handleChange} label="Ext." icon="extension" customInput={CustomInput} format="#####" mask="_" /></div>
            </div>
            : <div className="row">
              <div className="col-12">
                <NumberFormat id="phone" value={values.phone} onChange={handleChange} label="Celular" icon="phone_android" customInput={CustomInput} format={values.isAreaCodeTwoDigits ? '(##) ####-####' : '(###) ###-####'} mask="_" tooltip="Teléfono personal" />
              </div>
            </div>
        }

        <br />

        {/* <div className="d-flex justify-content-center">
          <RadioGroup row onChange={(e) => setGenderRadio(e.target.value)}>
            <FormControlLabel
              value="0"
              control={<Radio checked={genderRadio === '0'} color="secondary" />}
              label="Sr."
              labelPlacement="end"
            />
            <FormControlLabel
              value="1"
              control={<Radio checked={genderRadio === '1'} color="secondary" />}
              label="Srta."
              labelPlacement="end"
            />
          </RadioGroup>
        </div> */}

        <div className="row">
          <div className="col-6">
            <div className="wizard-controller">
              <Button onClick={() => previousStep()} bar={true} size={3} type="button" theme="primary" icon="arrow_back_ios" waves="light" />
            </div>
          </div>
          <div className="col-6">
            <div className="wizard-controller">
              <Button onClick={e => handleSubmit(e)} bar={true} size={3} type="button" theme="primary" icon="arrow_forward_ios" waves="light" />
            </div>
          </div>
        </div>
        <br />
        <br />
      </div>
    </div >
  )
}

const StepTwo = ({ formik, previousStep, nextStep, departments, jobs, subDepartments, setIsCatalogueOpen }) => {
  const { handleChange, values, setFieldValue } = useMemo(() => formik, [formik])


  const handleSubmit = e => {
    e.preventDefault()

    const name = values.name
    const lastName = values.lastName

    const executiveDirection = values.executiveDirection
    const job = values.job
    const area = values.area
    const department = values.department
    const subDepartment = values.subDepartment
    const address = values.address

    if (!name || !lastName || !executiveDirection || !job || !area || !address || !department || (!subDepartment && Object.keys(subDepartments).length > 0)) {
      ToastCall('Por favor ingresa todos los campos.', 'warning')
      return
    }

    nextStep()
  }

  useEffect(() => {

  }, [values.area])

  return (
    <div className="row step-two">
      <div style={{ textAlign: 'center' }} >
        <h3>Consulta el catálogo de puestos homologados que tenemos en la <b>Dirección Ejecutiva</b>.</h3>
        <br />
        <Button onClick={() => setIsCatalogueOpen(true)} icon="menu_book" bar={true} iconStyle="sharp" theme="rose" >Catálogo de Puestos</Button>
      </div>

      <br />
      <br />

      <div className="center" >
        <CustomSelect
          setFieldValue={setFieldValue}
          field="area"
          id="area"
          label="Área"
          options={{
            'Academia': 'Academia',
            'Atracción de Talento': 'Atracción de Talento',
            'Atracción y Desarrollo del Talento': 'Atracción y Desarrollo del Talento',
            'Talento y Diversidad e Inclusión': 'Talento y Diversidad e Inclusión'
          }}
        />

        <CustomSelect
          hidden={Object.keys(departments).length === 1}
          setFieldValue={setFieldValue}
          field="department"
          id="department"
          label="Departamento"
          resetWith={values.area}
          options={departments}
        />

        <CustomSelect
          setFieldValue={setFieldValue}
          field="job"
          id="job"
          label="Puesto"
          resetWith={values.department}
          options={jobs}
        />

        {
          Object.keys(subDepartments).length !== 0
            ? <CustomSelect
              setFieldValue={setFieldValue}
              field="subDepartment"
              id="subDepartment"
              label="Subdepartamento"
              resetWith={values.job}
              options={subDepartments}
            />
            : ''
        }
        <CustomInput id="address" value={titleize(values.address)} onChange={handleChange} label="Localización" icon="place" tooltip={`Agrega tu dirección de trabajo colocando alguna de las siguientes opciones donde cada elemento es separado por una coma:    
        <br/>
        <b/>Opción 1:</b>
        <ul>
          <li>Nombre del edificio.</li>
          <li>Ciudad.</li>
          <li>Módulo.</li>
        </ul>
        <b/>Opción 2:</b>
        <ul>
          <li>Calle y número.</li>
          <li>Piso o módulo.</li>
        </ul>
        <br/>
        Por ejemplo: <b>Contact Center, Planta Baja, Sílo Norte, Querétaro</b>`} />
        <br />
        <p style={{ fontWeight: 'bold' }} >Selecciona un ícono</p>
        <br />
        <CustomSelect
          setFieldValue={setFieldValue}
          field="customIcon"
          id="customIcon"
          label="Ícono"
          options={{
            academia: 'Academia',
            workday: 'WorkDay',
            talento: 'Talento y Diversidad e Inclusión',
          }}
          useKey={true}
          tooltip={`<ul>
            <li>Si eres de <b>Academia</b> selecciona tu ícono.</li>
            <li>Si eres <b>Atracción de Talento</b> selecciona el ícono <b>WorkDay</b>.</li>
            <li>Si eres de <b>Talento y Diversidad e Inclusión</b> selecciona el ícono <b>Talento y Diversidad e Inclusión</b>.</li>
          </ul>`}
        />
      </div>

      <br />
      <br />

      <div className="row">
        <div className="col-6">
          <div className="wizard-controller">
            <Button onClick={() => previousStep()} bar={true} size={3} type="button" theme="primary" icon="arrow_back_ios" waves="light" />
          </div>
        </div>
        <div className="col-6">
          <div className="wizard-controller">
            <Button onClick={e => handleSubmit(e)} bar={true} size={3} type="button" theme="primary" icon="arrow_forward_ios" waves="light" />
          </div>
        </div>
      </div>
    </div>
  )
}

const StepTree = ({ formik, previousStep, signature, setIsTutorial365Open, setIsTutorial2013Open, setIsFAQOpen }) => {
  const { values } = useMemo(() => formik, [formik])
  const [isLoadingOne, setIsLoadingOne] = useState(false)
  const [isLoadingTwo, setIsLoadingTwo] = useState(false)
  const [color, setColor] = useState('#e91e63')

  const downloadHandler = async e => {
    e.preventDefault()

    try {
      // if (zoomLevel() !== 1) throw new Error('El zoom de la página debe ser exactamente 100% para continuar.')

      setIsLoadingOne(true)

      const divider = 0.5

      const render = await toPng(signature.current, {
        canvasWidth: 1000,
        canvasHeight: 400,
        pixelRatio: 1
      })

      // const link = document.createElement('a')
      // link.download = 'my-image-name.png'
      // link.href = render
      // link.click()

      let lineXArray = []
      let lineYArray = []

      if (values.customIcon) {
        lineXArray = [84, 144, 300, 348]
        lineYArray = [480, 592, 664]
      } else {
        lineXArray = [84, 144, 300, 348]
        lineYArray = [536, 592, 652]
      }

      imageToSlices(render, lineXArray, lineYArray, {
        saveToDataUrl: true
      }, (dataUrlList) => {

        const createHTML = (data, email, firstLink, secondLink) => {
          return ReactDOMServer.renderToStaticMarkup(
            <html>
              <head>
                <style type="text/css">
                  {styleTagStringContent}
                </style>
              </head>
              <body>
                <table style={{ borderSpacing: 0, borderCollapse: 'collapse', 'mso-table-lspace': '0pt', 'mso-table-rspace': '0pt' }} id="table" width={1000 * divider} height={400 * divider} border="0" cellPadding="0" cellSpacing="0">
                  <tbody>
                    <tr>

                      <td style={{ padding: '0cm 0cm 0cm 0cm' }} >
                        <img src={'images/0.png'} width={data[0]?.width * divider} height={data[0]?.height * divider} alt="0" style={{ display: 'block', maxWidth: '100%' }} align="left" id={`OWATemporaryImageDivContainer${0}`} />
                      </td>

                      <td style={{ padding: '0cm 0cm 0cm 0cm' }} >
                        <img src={'images/1.png'} width={data[1]?.width * divider} height={data[1]?.height * divider} alt="1" style={{ display: 'block', maxWidth: '100%' }} align="left" id={`OWATemporaryImageDivContainer${1}`} />
                      </td>

                      <td style={{ padding: '0cm 0cm 0cm 0cm' }} >
                        <img src={'images/2.png'} width={data[2]?.width * divider} height={data[2]?.height * divider} alt="2" style={{ display: 'block', maxWidth: '100%' }} align="left" id={`OWATemporaryImageDivContainer${2}`} />
                      </td>

                      <td style={{ padding: '0cm 0cm 0cm 0cm' }} >
                        <img src={'images/3.png'} width={data[3]?.width * divider} height={data[3]?.height * divider} alt="3" style={{ display: 'block', maxWidth: '100%' }} align="left" id={`OWATemporaryImageDivContainer${3}`} />
                      </td>

                    </tr>
                    <tr>

                      <td style={{ padding: '0cm 0cm 0cm 0cm' }} >
                        <img src={'images/4.png'} width={data[4]?.width * divider} height={data[4]?.height * divider} alt="4" style={{ display: 'block', maxWidth: '100%' }} align="left" id={`OWATemporaryImageDivContainer${4}`} />
                      </td>

                      <td style={{ padding: '0cm 0cm 0cm 0cm' }} >
                        <img src={'images/5.png'} width={data[5]?.width * divider} height={data[5]?.height * divider} alt="5" style={{ display: 'block', maxWidth: '100%' }} align="left" id={`OWATemporaryImageDivContainer${5}`} />
                      </td>

                      <td style={{ padding: '0cm 0cm 0cm 0cm' }} >
                        <a href={`https://teams.microsoft.com/l/chat/0/0?users=${email}@santander.com.mx`} target="_blank" rel="noreferrer">
                          <img src={'images/6.png'} width={data[6]?.width * divider} height={data[6]?.height * divider} alt="6" style={{ display: 'block', maxWidth: '100%' }} align="left" id={`OWATemporaryImageDivContainer${6}`} />
                        </a>
                      </td>

                      <td style={{ padding: '0cm 0cm 0cm 0cm' }} >
                        <a href={`https://teams.microsoft.com/l/chat/0/0?users=${email}@santander.com.mx`} target="_blank" rel="noreferrer">
                          <img src={'images/7.png'} width={data[7]?.width * divider} height={data[7]?.height * divider} alt="7" style={{ display: 'block', maxWidth: '100%' }} align="left" id={`OWATemporaryImageDivContainer${7}`} />
                        </a>
                      </td>

                    </tr>
                    <tr>

                      <td style={{ padding: '0cm 0cm 0cm 0cm' }} >
                        <img src={'images/8.png'} width={data[8]?.width * divider} height={data[8]?.height * divider} alt="8" style={{ display: 'block', maxWidth: '100%' }} align="left" id={`OWATemporaryImageDivContainer${8}`} />
                      </td>

                      <td style={{ padding: '0cm 0cm 0cm 0cm' }} >
                        <img src={'images/9.png'} width={data[9]?.width * divider} height={data[9]?.height * divider} alt="9" style={{ display: 'block', maxWidth: '100%' }} align="left" id={`OWATemporaryImageDivContainer${9}`} />
                      </td>

                      <td style={{ padding: '0cm 0cm 0cm 0cm' }} >
                        <img src={'images/10.png'} width={data[10]?.width * divider} height={data[10]?.height * divider} alt="10" style={{ display: 'block', maxWidth: '100%' }} align="left" id={`OWATemporaryImageDivContainer${10}`} />
                      </td>

                      <td style={{ padding: '0cm 0cm 0cm 0cm' }} >
                        <img src={'images/11.png'} width={data[11]?.width * divider} height={data[11]?.height * divider} alt="11" style={{ display: 'block', maxWidth: '100%' }} align="left" id={`OWATemporaryImageDivContainer${11}`} />
                      </td>

                    </tr>
                    <tr>

                      <td style={{ padding: '0cm 0cm 0cm 0cm' }} >
                        <img src={'images/12.png'} width={data[12]?.width * divider} height={data[12]?.height * divider} alt="12" style={{ display: 'block', maxWidth: '100%' }} align="left" id={`OWATemporaryImageDivContainer${12}`} />
                      </td>

                      <td style={{ padding: '0cm 0cm 0cm 0cm' }} >
                        <a href={firstLink} target="_blank" rel="noreferrer">
                          <img src={'images/13.png'} width={data[13]?.width * divider} height={data[13]?.height * divider} alt="13" style={{ display: 'block', maxWidth: '100%' }} align="left" id={`OWATemporaryImageDivContainer${13}`} />
                        </a>
                      </td>

                      <td style={{ padding: '0cm 0cm 0cm 0cm' }} >
                        {
                          secondLink
                            ? <a href={secondLink} target="_blank" rel="noreferrer">
                              <img src={'images/14.png'} width={data[14]?.width * divider} height={data[14]?.height * divider} alt="14" style={{ display: 'block', maxWidth: '100%' }} align="left" id={`OWATemporaryImageDivContainer${14}`} />
                            </a>
                            : <a href={firstLink} target="_blank" rel="noreferrer">
                              <img src={'images/14.png'} width={data[14]?.width * divider} height={data[14]?.height * divider} alt="14" style={{ display: 'block', maxWidth: '100%' }} align="left" id={`OWATemporaryImageDivContainer${14}`} />
                            </a>
                        }
                      </td>

                      <td style={{ padding: '0cm 0cm 0cm 0cm' }} >
                        <img src={'images/15.png'} width={data[15]?.width * divider} height={data[15]?.height * divider} alt="15" style={{ display: 'block', maxWidth: '100%' }} align="left" id={`OWATemporaryImageDivContainer${15}`} />
                      </td>

                    </tr>
                    <tr>

                      <td style={{ padding: '0cm 0cm 0cm 0cm' }} >
                        <img src={'images/16.png'} width={data[16]?.width * divider} height={data[16]?.height * divider} alt="16" style={{ display: 'block', maxWidth: '100%' }} align="left" id={`OWATemporaryImageDivContainer${16}`} />
                      </td>

                      <td style={{ padding: '0cm 0cm 0cm 0cm' }} >
                        <img src={'images/17.png'} width={data[17]?.width * divider} height={data[17]?.height * divider} alt="17" style={{ display: 'block', maxWidth: '100%' }} align="left" id={`OWATemporaryImageDivContainer${17}`} />
                      </td>

                      <td style={{ padding: '0cm 0cm 0cm 0cm' }} >
                        <img src={'images/18.png'} width={data[18]?.width * divider} height={data[18]?.height * divider} alt="18" style={{ display: 'block', maxWidth: '100%' }} align="left" id={`OWATemporaryImageDivContainer${18}`} />
                      </td>

                      <td style={{ padding: '0cm 0cm 0cm 0cm' }} >
                        <img src={'images/19.png'} width={data[19]?.width * divider} height={data[19]?.height * divider} alt="19" style={{ display: 'block', maxWidth: '100%' }} align="left" id={`OWATemporaryImageDivContainer${19}`} />
                      </td>

                    </tr>
                  </tbody>
                </table >
              </body>
            </html>
          )
        }

        const html = createHTML(
          dataUrlList,
          formik?.values?.email,
          'https://logcorp.aacc.gs.corp/?environment=0&okURI=https%3A%2F%2Fespacio-empleado.aacc.gs.corp',
          icons[formik?.values?.customIcon]?.url
        )

        const zip = new JSZip()

        zip.file("index.html", html)

        const img = zip.folder("images")
        dataUrlList.forEach((e, index) => {
          const data = e.dataURI.indexOf('base64,') + 'base64,'.length

          var content = e.dataURI.substring(data)

          img.file(`${index}.png`, content, { base64: true })
        })

        zip.generateAsync({ type: "blob" }).then(function (content) {
          saveAs(content, "firma.zip")
        })

        setIsLoadingOne(false)
      })

    } catch (error) {
      ToastCall(error.message, 'danger')
    }
  }

  const openHandler = async e => {
    e.preventDefault()

    try {
      // if (zoomLevel() !== 1) throw new Error('El zoom de la página debe ser 100% continuar.')
      setIsLoadingTwo(true)

      const divider = 0.5

      const render = await toPng(signature.current, {
        canvasWidth: 1000,
        canvasHeight: 400,
        pixelRatio: 1
      })

      // const link = document.createElement('a')
      // link.download = 'my-image-name.png'
      // link.href = render
      // link.click()

      let lineXArray = []
      let lineYArray = []

      if (values.customIcon) {
        lineXArray = [84, 144, 300, 348]
        lineYArray = [480, 592, 752]
      } else {
        lineXArray = [84, 144, 300, 348]
        lineYArray = [536, 592, 652]
      }

      imageToSlices(render, lineXArray, lineYArray, {
        saveToDataUrl: true
      }, (dataUrlList) => {

        const createHTML = (data, email, firstLink, secondLink) => {
          return ReactDOMServer.renderToStaticMarkup(
            <html>
              <head>
                <style type="text/css">
                  {styleTagStringContent}
                </style>
              </head>
              <body>
                <table style={{ borderSpacing: 0, borderCollapse: 'collapse', 'mso-table-lspace': '0pt', 'mso-table-rspace': '0pt' }} id="table" width={1000 * divider} height={400 * divider} border="0" cellPadding="0" cellSpacing="0">
                  <tbody>
                    <tr>

                      <td style={{ padding: '0cm 0cm 0cm 0cm' }} >
                        <img src={data[0].dataURI} width={data[0]?.width * divider} height={data[0]?.height * divider} alt="0" style={{ display: 'block', maxWidth: '100%' }} align="left" id={`OWATemporaryImageDivContainer${0}`} />
                      </td>

                      <td style={{ padding: '0cm 0cm 0cm 0cm' }} >
                        <img src={data[1].dataURI} width={data[1]?.width * divider} height={data[1]?.height * divider} alt="1" style={{ display: 'block', maxWidth: '100%' }} align="left" id={`OWATemporaryImageDivContainer${1}`} />
                      </td>

                      <td style={{ padding: '0cm 0cm 0cm 0cm' }} >
                        <img src={data[2].dataURI} width={data[2]?.width * divider} height={data[2]?.height * divider} alt="2" style={{ display: 'block', maxWidth: '100%' }} align="left" id={`OWATemporaryImageDivContainer${2}`} />
                      </td>

                      <td style={{ padding: '0cm 0cm 0cm 0cm' }} >
                        <img src={data[3].dataURI} width={data[3]?.width * divider} height={data[3]?.height * divider} alt="3" style={{ display: 'block', maxWidth: '100%' }} align="left" id={`OWATemporaryImageDivContainer${3}`} />
                      </td>

                    </tr>
                    <tr>

                      <td style={{ padding: '0cm 0cm 0cm 0cm' }} >
                        <img src={data[4].dataURI} width={data[4]?.width * divider} height={data[4]?.height * divider} alt="4" style={{ display: 'block', maxWidth: '100%' }} align="left" id={`OWATemporaryImageDivContainer${4}`} />
                      </td>

                      <td style={{ padding: '0cm 0cm 0cm 0cm' }} >
                        <img src={data[5].dataURI} width={data[5]?.width * divider} height={data[5]?.height * divider} alt="5" style={{ display: 'block', maxWidth: '100%' }} align="left" id={`OWATemporaryImageDivContainer${5}`} />
                      </td>

                      <td style={{ padding: '0cm 0cm 0cm 0cm' }} >
                        <a href={`https://teams.microsoft.com/l/chat/0/0?users=${email}@santander.com.mx`} target="_blank" rel="noreferrer">
                          <img src={data[6].dataURI} width={data[6]?.width * divider} height={data[6]?.height * divider} alt="6" style={{ display: 'block', maxWidth: '100%' }} align="left" id={`OWATemporaryImageDivContainer${6}`} />
                        </a>
                      </td>

                      <td style={{ padding: '0cm 0cm 0cm 0cm' }} >
                        <a href={`https://teams.microsoft.com/l/chat/0/0?users=${email}@santander.com.mx`} target="_blank" rel="noreferrer">
                          <img src={data[7].dataURI} width={data[7]?.width * divider} height={data[7]?.height * divider} alt="7" style={{ display: 'block', maxWidth: '100%' }} align="left" id={`OWATemporaryImageDivContainer${7}`} />
                        </a>
                      </td>

                    </tr>
                    <tr>

                      <td style={{ padding: '0cm 0cm 0cm 0cm' }} >
                        <img src={data[8].dataURI} width={data[8]?.width * divider} height={data[8]?.height * divider} alt="8" style={{ display: 'block', maxWidth: '100%' }} align="left" id={`OWATemporaryImageDivContainer${8}`} />
                      </td>

                      <td style={{ padding: '0cm 0cm 0cm 0cm' }} >
                        <img src={data[9].dataURI} width={data[9]?.width * divider} height={data[9]?.height * divider} alt="9" style={{ display: 'block', maxWidth: '100%' }} align="left" id={`OWATemporaryImageDivContainer${9}`} />
                      </td>

                      <td style={{ padding: '0cm 0cm 0cm 0cm' }} >
                        <img src={data[10].dataURI} width={data[10]?.width * divider} height={data[10]?.height * divider} alt="10" style={{ display: 'block', maxWidth: '100%' }} align="left" id={`OWATemporaryImageDivContainer${10}`} />
                      </td>

                      <td style={{ padding: '0cm 0cm 0cm 0cm' }} >
                        <img src={data[11].dataURI} width={data[11]?.width * divider} height={data[11]?.height * divider} alt="11" style={{ display: 'block', maxWidth: '100%' }} align="left" id={`OWATemporaryImageDivContainer${11}`} />
                      </td>

                    </tr>
                    <tr>

                      <td style={{ padding: '0cm 0cm 0cm 0cm' }} >
                        <img src={data[12].dataURI} width={data[12]?.width * divider} height={data[12]?.height * divider} alt="12" style={{ display: 'block', maxWidth: '100%' }} align="left" id={`OWATemporaryImageDivContainer${12}`} />
                      </td>

                      <td style={{ padding: '0cm 0cm 0cm 0cm' }} >
                        <a href={firstLink} target="_blank" rel="noreferrer">
                          <img src={data[13].dataURI} width={data[13]?.width * divider} height={data[13]?.height * divider} alt="13" style={{ display: 'block', maxWidth: '100%' }} align="left" id={`OWATemporaryImageDivContainer${13}`} />
                        </a>
                      </td>

                      <td style={{ padding: '0cm 0cm 0cm 0cm' }} >
                        {
                          secondLink
                            ? <a href={secondLink} target="_blank" rel="noreferrer">
                              <img src={data[14].dataURI} width={data[14]?.width * divider} height={data[14]?.height * divider} alt="14" style={{ display: 'block', maxWidth: '100%' }} align="left" id={`OWATemporaryImageDivContainer${14}`} />
                            </a>
                            : <a href={firstLink} target="_blank" rel="noreferrer">
                              <img src={data[14].dataURI} width={data[14]?.width * divider} height={data[14]?.height * divider} alt="14" style={{ display: 'block', maxWidth: '100%' }} align="left" id={`OWATemporaryImageDivContainer${14}`} />
                            </a>
                        }
                      </td>

                      <td style={{ padding: '0cm 0cm 0cm 0cm' }} >
                        <img src={data[15].dataURI} width={data[15]?.width * divider} height={data[15]?.height * divider} alt="15" style={{ display: 'block', maxWidth: '100%' }} align="left" id={`OWATemporaryImageDivContainer${15}`} />
                      </td>

                    </tr>
                    <tr>

                      <td style={{ padding: '0cm 0cm 0cm 0cm' }} >
                        <img src={data[16].dataURI} width={data[16]?.width * divider} height={data[16]?.height * divider} alt="16" style={{ display: 'block', maxWidth: '100%' }} align="left" id={`OWATemporaryImageDivContainer${16}`} />
                      </td>

                      <td style={{ padding: '0cm 0cm 0cm 0cm' }} >
                        <img src={data[17].dataURI} width={data[17]?.width * divider} height={data[17]?.height * divider} alt="17" style={{ display: 'block', maxWidth: '100%' }} align="left" id={`OWATemporaryImageDivContainer${17}`} />
                      </td>

                      <td style={{ padding: '0cm 0cm 0cm 0cm' }} >
                        <img src={data[18].dataURI} width={data[18]?.width * divider} height={data[18]?.height * divider} alt="18" style={{ display: 'block', maxWidth: '100%' }} align="left" id={`OWATemporaryImageDivContainer${18}`} />
                      </td>

                      <td style={{ padding: '0cm 0cm 0cm 0cm' }} >
                        <img src={data[19].dataURI} width={data[19]?.width * divider} height={data[19]?.height * divider} alt="19" style={{ display: 'block', maxWidth: '100%' }} align="left" id={`OWATemporaryImageDivContainer${19}`} />
                      </td>

                    </tr>
                  </tbody>
                </table >
              </body>
            </html>
          )
        }

        const html = createHTML(
          dataUrlList,
          formik?.values?.email,
          'https://logcorp.aacc.gs.corp/?environment=0&okURI=https%3A%2F%2Fespacio-empleado.aacc.gs.corp',
          icons[formik?.values?.customIcon]?.url
        )

        const win = window.open('about:blank', '_blank')
        win.document.write(html)
        win.focus()

        setIsLoadingTwo(false)
      })

    } catch (error) {
      ToastCall(error.message, 'danger')
    }
  }

  // const handleColor = (e) => {
  //   setColor(e)
  //   document.documentElement.style.setProperty('--secondary-color', e)
  // }

  return (
    <div className="row step-tree">
      <h1 className="title" >¡Tu firma está lista!</h1>

      {/* <p>Prueba de color.</p>
      <input
        value={color}
        type="color"
        onChange={(e) => handleColor(e.target.value)}
        style={{ "--secondary-color": color }}
      /> */}

      <br />


      <h2 style={{ textAlign: 'center' }} >Identifica tu versión de <b>Outlook</b>.</h2>
      <h3 style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }} >Haz clic en los botones de ayuda <Button style={{ margin: '0.5rem' }} icon="quiz" round={true} theme="info" iconSize={1} size={2} /> para ver las instrucciones.</h3>
      <br />
      <p style={{ textAlign: 'center' }}>Recomendamos utilizar la versión de escritorio.</p>
      <br />


      <br />

      <div className="download-button-container">
        <div >
          <Button
            data-clipboard-target="#table"
            className="btn"
            icon={
              !isLoadingOne
                ? 'download'
                : 'cake'
            }
            theme={
              !isLoadingOne
                ? 'success'
                : 'rose'
            }
            vertical={true}
            size={7.5}
            iconSize={2.5}
            waves="light"
            onClick={(e) => downloadHandler(e)}
          >
            {
              !isLoadingOne
                ? <b style={{ color: 'white' }}>Versión de Escritorio</b>
                : 'Cocinando tu nueva firma'
            }
          </Button>
          <br />
          <Button onClick={() => setIsTutorial2013Open(true)} icon="quiz" round={true} theme="info" size={3} />
        </div>

        <div >
          <Button
            data-clipboard-target="#table"
            className="btn"
            icon={
              !isLoadingTwo
                ? 'open_in_new'
                : 'cake'
            }
            theme={
              !isLoadingTwo
                ? 'success'
                : 'rose'
            }
            vertical={true}
            size={7.5}
            iconSize={2.5}
            waves="light"
            onClick={(e) => openHandler(e)}
          >
            {
              !isLoadingTwo
                ? <b style={{ color: 'white' }} >Versión WEB</b>
                : 'Cocinando tu nueva firma'
            }
          </Button>
          <br />
          <Button onClick={() => setIsTutorial365Open(true)} icon="quiz" round={true} theme="info" size={3} />
        </div>
      </div>

      <br />
      <br />
      <Button theme="rose" onClick={() => setIsFAQOpen(true)} >Preguntas Frecuentes</Button>

      <br />
      <br />
      <div className="wizard-controller">
        <Button onClick={() => previousStep()} size={3} type="button" theme="primary" icon="arrow_back_ios" waves="light" />
      </div>
    </div>
  )
}

const CustomInput = ({ value, onChange, id, label, icon, type = 'text', theme = 'rose', ...rest }) => {
  return (
    <Input
      {...rest}
      id={id}
      value={value}
      onChange={onChange}
      label={label}
      theme={theme}
      icon={icon}
      type={type}
      centeredLabel={false}
      spellCheck="false"
    />
  )
}

const CustomSelect = ({ setFieldValue, field, id, label, icon, resetWith, type = 'text', useKey = false, theme = 'rose', ...rest }) => {
  const [value, setValue] = useState('')

  useEffect(() => {
    useKey ? setFieldValue(field, value) : setFieldValue(field, rest.options[value])
  }, [value])

  useEffect(() => {
    setValue('')
    setFieldValue(field, '')
  }, [resetWith])

  useEffect(() => {
    const keys = Object.keys(rest.options)

    if (keys.length === 1) {
      setFieldValue(field, rest.options[keys[0]])
      setValue(rest.options[keys[0]])
    }
  }, [rest.options])


  return (
    <Select
      {...rest}
      id={id}
      value={value}
      setValue={setValue}
      label={label}
      theme={theme}
      icon={icon}
      type={type}
      centeredLabel={false}
      spellCheck="false"
      useKey={useKey}
    />
  )
}


const styleTagStringContent = `
      [office365] table {
        border: 0 !important;
        border-collapse: collapse !important;
        border-spacing: 0 !important;
        border: 0 !important;
      }

      [office365] button, img {
        display: block !important;
        margin: 0 !important;
      }

      div,
      button,
      p,
      span {
        margin: 0 !important;
        padding: 0 !important;
        display: block !important;
        text-indent: 0 !important;
        padding: 0 !important;
        font-size: 0 !important;
        border: 0 !important;
      }

      img {
        margin: 0 !important;
      }

      p, span {
        line-height: 0 !important;
      }

      table {
        border: 0 !important;
        border-collapse: collapse !important;
        border-spacing: 0 !important;
        font-size: 0 !important;
        padding: 0 !important;
        border: 0 !important;
      }

      td {
        font-size: 0 !important;
        padding: 0 !important;
        border: 0 !important;
        border-collapse: collapse !important;
      }

      tr, tbody {
        border: 0 !important;
        border-collapse: collapse !important;
      }
      `

export default App