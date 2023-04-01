import React, { useState } from 'react'
import { chatThemes } from '../../../core/UtilScripts/CommonUtil';
import { Card, CardHeader,CardBody } from '../../card/Card';
import { PopupClose } from '../Popup';
import './Component.scss';
import Button from '../../button/Button';

const ThemePopup = ({closePopup, selectedTheme}) => {
    const [theme, setTheme] = useState('')
    return (
        <>
            <Card style={{padding: "0px"}}>
                <CardHeader >
                    <div onClick={() => closePopup({actionType: 'CLOSE', closeType: 'icon'})} className={'color-000000 themes-header-container display-flex align-items-center justify-content-center height-60-px position-relative width-100-percentage padding-left-10-px font-weight-600 font-size-18-px padding-right-10-px position-relative'}>
                        <div>
                            Themes
                        </div>
                        <PopupClose classes={'position-absolute right-10-px top-15-px'}/>
                    </div>
                    <CardBody classes={'padding-15-px'}>
                        <div className='display-flex flex-wrap-wrap justify-content-space-between'>
                            {
                                chatThemes.map((t,index) => {
                                    return (
                                        <div key={'theme'+index} onClick={() => {selectedTheme({actionType: "SELECTED_THEME", theme: t} ); setTheme(t)}} className={`${theme === t ? 'selected-theme' : ''}  width-60-height-60-px ripple border-radius-25-percentage display-flex align-items-center justify-content-center theme-item-container`}>
                                            <div  style={{background: t}} className="width-45-height-45-px border-radius-50-percentage cursor-pointer"></div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='display-flex padding-top-10-px gap-10-px justify-content-flex-end'>
                            <Button onClick={() => closePopup({actionType: 'CLOSE', closeType: 'icon'})} btnType={'primary-outline'} size={'small'} classes={'border-width-0-px min-width-80-px font-weight-500 bg-transparent font-size-15-px border-radius-6-px'}>
                                Cancel
                            </Button>
                            <Button onClick={() => closePopup({actionType: "SET_THEME", theme: theme})}  btnType={'primary'} size={'small'}  classes={'font-size-15-px border-radius-6-px font-weight-500 min-width-80-px'}>
                                Save
                            </Button>
                        </div>
                    </CardBody>
                </CardHeader>
            </Card>
        </>
    )
}

export default ThemePopup